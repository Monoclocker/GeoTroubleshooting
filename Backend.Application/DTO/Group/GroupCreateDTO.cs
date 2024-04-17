using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Application.DTO.Group
{
    public class GroupCreateDTO
    {
        [Required]
        public string Name { get; set; } = default!;
        public string? Description { get; set; }

        [Required]
        public string CreatorName { get; set; } = default!;

    }
}
