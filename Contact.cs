using System.ComponentModel.DataAnnotations;

namespace ContactApp.Models.Domain
{
    public class Contact
    {
        [Key]
        public int Id { get; set; }
        public required string Name { get; set; }
        public string? Email { get; set; }
        public required string Phone { get; set; }
        public bool Favorite { get; set; }
    }
}
