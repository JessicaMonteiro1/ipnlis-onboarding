namespace API.Models.DTO
{
    public class ProjetoRequestDto
    {
        public Guid projetoID { get; set; }
        public string projetoNome { get; set; }
        public string userNome { get; set; }
        public string estado { get; set; }
        public int orcamento { get; set; }
        public string clienteNome { get; set; }
    }
}
