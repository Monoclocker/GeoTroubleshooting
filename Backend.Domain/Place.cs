using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain
{
    public class Place
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public float[] Coordinates { get; set; } = default!;
        public PlaceType Type { get; set; } = default!;
        public int TypeId {  get; set; }
    }
}
