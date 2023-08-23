using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Tarefas
    {
        [Key]
        public Guid tarefaID { get; set; }
        public string tarefaNome { get; set; }
        public Guid userID { get; set; }
        public Guid projetoID { get; set; }
        public string estado { get; set; }

        public DateTime? dataInicio { get; set; }
        public DateTime? dataLimite { get; set; }



        [ForeignKey("userID")]
        [Required]
        public Utilizadores Utilizadores { get; set; }

        [ForeignKey("projetoID")]
        [Required]
        public Projetos Projetos { get; set; }
    }
}
