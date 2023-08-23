using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Utilizadores
    {
        [Key]
        public Guid userID { get; set; }
        public string? userNome { get; set; }
        public string? role { get; set; }
        public string? email { get; set; }
        public string? telefone { get; set; }
        public string? token { get; set; }
        public string? password { get; set; }
    }
}
