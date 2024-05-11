using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain
{
    public class PlaceType
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public List<Place> Places { get; set; } = new List<Place>();
    }
}
