using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Application.DTO.Places
{
    public class PlaceTypeDTO
    {
        public int id { get; set; }
        public string name { get; set; } = default!;
        public PlaceDTO[] places { get; set; } = default!;
    }
}
