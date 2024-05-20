using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Application.DTO.Marker
{
    public class MarkerPredictionDTO
    {
        public string predictionLabel { get; set; } = default!;
        public float probability { get; set; }
        public string markerId { get; set; } = default!;
        public int placeId {get; set; }
    }
}
