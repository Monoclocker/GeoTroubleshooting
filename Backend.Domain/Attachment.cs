using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain
{
    public class Attachment
    { 
        public string Type { get; set; } = default!;
        public string Path { get; set; } = default!;
    }
}
