using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Projetos
    {
        [Key]
        public Guid projetoID { get; set; }
        public string projetoNome { get; set; }
        public string estado { get; set; }
        public Guid userID { get; set; }
        public int orcamento { get; set; }
        public string clienteNome { get; set; }

        [ForeignKey("userID")]
        public Utilizadores Utilizadores { get; set; }
    }
}
