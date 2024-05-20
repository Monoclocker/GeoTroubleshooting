using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Application.Interfaces
{
    public interface IPredictionService
    {
        public Task<(string, float, bool)> Predict(List<string> images); 
    }
}
