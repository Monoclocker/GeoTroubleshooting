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


            Dictionary<string, (float, int)> votes = Labels.ToDictionary(x => x.Value, x => (0.0f, 0));

            foreach(string imagePath in images)
            {
                var image = Bitmap.FromFile(imagePath);

                var inputTensor = OnnxHelper.CreateTensorFromImage("input_1", image);

                var result = model.RunInference(new ReadOnlyCollection<NamedOnnxValue>(new List<NamedOnnxValue>() { inputTensor }));

                Console.WriteLine(result);

                var output = result.First().AsEnumerable<float>().ToArray();

                foreach(var value in  output)
                    Console.WriteLine(value);


                var index = Array.IndexOf(output, output.Max());

                string label = Labels[index];

                (float, int) vote = votes[label];

                vote.Item1 += output.Max();
                vote.Item2++;

                votes[label] = vote;
            }

            KeyValuePair<string, (float, int)> maximumVote = votes.OrderByDescending(x => x.Value.Item2).First();

            (string, float, bool) prediction = new(maximumVote.Key, maximumVote.Value.Item1 / maximumVote.Value.Item2,
                Labels.Where(x=>x.Value == maximumVote.Key).First().Key > 0);

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
