using Backend.Application.DTO.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Application.Interfaces
{
    public interface IUtilsService
    {
        public Task<List<RolesDTO>> GetRoles();
    }
}
