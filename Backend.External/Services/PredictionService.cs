using Backend.Application.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.ML.OnnxRuntime;
using Microsoft.ML.OnnxRuntime.Tensors;
using System.Collections.ObjectModel;
using System.Drawing;
using System.Text.Json;


namespace Backend.External.Services
{
    public class PredictionService: IPredictionService
    {
        
        IConfiguration configuration;
        OnnxModel model;
        Dictionary<int, string> Labels;

        public PredictionService(IConfiguration configuration)
        {
            this.configuration = configuration;
            model = new OnnxModel(Path.Combine(this.configuration["modelPath"]!, this.configuration["modelName"]!));
            JsonDocument json = JsonDocument.Parse(File.ReadAllText(this.configuration["labelsPath"]!));
            Labels = json.Deserialize<Dictionary<int, string>>()!;
        }

        public async Task<(string, float, bool)> Predict(List<string> images)
        {
            var image = Bitmap.FromFile(images[0]);

            var inputTensor = OnnxHelper.CreateTensorFromImage("input_1", image);

            var result = model.RunInference(new ReadOnlyCollection<NamedOnnxValue>(new List<NamedOnnxValue>() { inputTensor }));

            var output = result.First().AsEnumerable<float>().ToArray();

            bool needToSendMessage = true;
            float sumProbability = 0f;
            string predictionString = "";
            int numberOfClasses = 0;

            for(int i = 0; i < output.Length; i++)
            {
                if (i == 0 && output[i] > 0.8)
                {
                    sumProbability = output[i];
                    predictionString = Labels[i];
                    needToSendMessage = false;
                    numberOfClasses++;
                    break;
                }

                if (output[i] > 0.8)
                {
                    sumProbability += output[i];
                    predictionString += Labels[i] + " ";
                    numberOfClasses++;
                }
            }

            (string, float, bool) prediction = new(predictionString, sumProbability/numberOfClasses, needToSendMessage);
            return await Task.FromResult(prediction);
        }

        private class OnnxModel
        {
            private readonly InferenceSession session;

            public OnnxModel(string path)
            {
                session = new InferenceSession(path);
            }

            public IDisposableReadOnlyCollection<DisposableNamedOnnxValue> RunInference(IReadOnlyCollection<NamedOnnxValue> input)
            {
                return session.Run(input);
            }

        }

        private class OnnxHelper
        {
            public static NamedOnnxValue CreateTensorFromImage(string name, Image image)
            {
                Bitmap newImage = ResizeBitmap(image, 299, 299);
                var input = new DenseTensor<float>([1, 299, 299, 3]);

                for (int y = 0; y < 299; y++)
                {
                    for (int x = 0; x < 299; x++)
                    {
                        var pixel = newImage.GetPixel(x, y);
                        input[0, y, x, 0] = pixel.R / 255.0f;
                        input[0, y, x, 1] = pixel.G / 255.0f;
                        input[0, y, x, 2] = pixel.B / 255.0f;

                    }
                }
                
                return NamedOnnxValue.CreateFromTensor(name, input);
            }


            private static Bitmap ResizeBitmap(Image bmp, int width, int height)
            {
                Bitmap result = new Bitmap(width, height);
                using (Graphics g = Graphics.FromImage(result))
                {
                    g.DrawImage(bmp, 0, 0, width, height);
                }

                return result;
            }
        }


    }
}
