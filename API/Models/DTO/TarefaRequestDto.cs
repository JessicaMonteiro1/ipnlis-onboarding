namespace API.Models.DTO
{
    public class TarefaRequestDto
    {
        public Guid tarefaID { get; set; }
        public string tarefaNome { get; set; }
        public string userNome { get; set; }
        public string projetoNome { get; set; }
        public string estado { get; set; }
        public DateTime? dataInicio { get; set; }
        public DateTime? dataLimite { get; set; }
    }
}
