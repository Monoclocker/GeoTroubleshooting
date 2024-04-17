using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Application.Exceptions
{
    public class BadPasswordException: Exception
    {
        public BadPasswordException() : base() { }
    }
}
