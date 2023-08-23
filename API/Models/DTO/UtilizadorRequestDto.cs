namespace API.Models.DTO
{
    public class UtilizadorRequestDto
    {
        public Guid userID { get; set; }
        public string userNome { get; set; }
        public string role { get; set; }
        public string email { get; set; }
        public string telefone { get; set; }
    }
}
