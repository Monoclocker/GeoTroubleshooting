using Backend.Application.DTO.Marker;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Application.Interfaces
{
    public interface INotificationService
    {
        public Task SendEmail(MarkerPredictionDTO prediction);
    }
}
