using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;
using API.Models.DTO;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using API.Helpers;



namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjetosController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public ProjetosController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        // ... (os outros métodos permanecem inalterados)

        // POST: api/Projetos

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddProjeto([FromBody] ProjetoRequestDto projetoRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var novoProjeto = new Projetos
            {
                projetoID = Guid.NewGuid(),
                projetoNome = projetoRequestDto.projetoNome,
                estado = projetoRequestDto.estado,
                orcamento = projetoRequestDto.orcamento,
                clienteNome = projetoRequestDto.clienteNome
            };

            // Verifica se o gestor (ou programador) existe no banco de dados
            var gestorProgramador = await _applicationDbContext.Utilizadores
                .FirstOrDefaultAsync(u => u.userNome == projetoRequestDto.userNome);

            if (gestorProgramador == null)
            {
                return BadRequest("O gestor ou programador especificado não foi encontrado.");
            }

            // Define o ID do gestor (ou programador) associado ao projeto
            novoProjeto.userID = gestorProgramador.userID;
            novoProjeto.Utilizadores = gestorProgramador;

            // Adiciona o novo projeto ao contexto e salva as mudanças
            await _applicationDbContext.Projetos.AddAsync(novoProjeto);
            await _applicationDbContext.SaveChangesAsync();

            return Ok(MapProjetoToDTO(novoProjeto));
        }

        // PUT: api/Projetos/{id}
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProjeto(Guid id, [FromBody] ProjetoRequestDto projetoRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingProjeto = await _applicationDbContext.Projetos.FirstOrDefaultAsync(p => p.projetoID == id);

            if (existingProjeto == null)
            {
                return NotFound();
            }

            existingProjeto.projetoNome = projetoRequestDto.projetoNome;
            existingProjeto.estado = projetoRequestDto.estado;
            existingProjeto.orcamento = projetoRequestDto.orcamento;
            existingProjeto.clienteNome = projetoRequestDto.clienteNome;

            // Verifica se o gestor (ou programador) existe no banco de dados
            var gestorProgramador = await _applicationDbContext.Utilizadores
                .FirstOrDefaultAsync(u => u.userNome == projetoRequestDto.userNome);

            if (gestorProgramador == null)
            {
                return BadRequest("O gestor ou programador especificado não foi encontrado.");
            }

            // Define o ID do gestor (ou programador) associado ao projeto
            existingProjeto.userID = gestorProgramador.userID;
            existingProjeto.Utilizadores = gestorProgramador;

            // Salva as mudanças
            await _applicationDbContext.SaveChangesAsync();

            return Ok(MapProjetoToDTO(existingProjeto));
        }


        // GET: api/Projetos
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllProjetos()
        {
            var projetos = await _applicationDbContext.Projetos
                .Include(p => p.Utilizadores)
                .ToListAsync();

            var projetosDTO = projetos.Select(projeto => MapProjetoToDTO(projeto)).ToList();

            return Ok(projetosDTO);
        }

        // GET: api/Projetos/{id}
        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProjeto(Guid id)
        {
            var projeto = await _applicationDbContext.Projetos
                .Include(p => p.Utilizadores)
                .FirstOrDefaultAsync(p => p.projetoID == id);

            if (projeto == null)
            {
                return NotFound();
            }

            return Ok(MapProjetoToDTO(projeto));
        }

        // DELETE: api/Projetos/{id}
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjeto(Guid id)
        {
            var projeto = await _applicationDbContext.Projetos
                .FirstOrDefaultAsync(p => p.projetoID == id);

            if (projeto == null)
            {
                return NotFound();
            }

            _applicationDbContext.Projetos.Remove(projeto);
            await _applicationDbContext.SaveChangesAsync();

            return Ok(MapProjetoToDTO(projeto));
        }


        // ... (os demais métodos permanecem inalterados)

        // Método para mapear um projeto para o DTO
        private ProjetoRequestDto MapProjetoToDTO(Projetos projeto)
        {
            return new ProjetoRequestDto
            {
                projetoID = projeto.projetoID,
                projetoNome = projeto.projetoNome,
                userNome = projeto.Utilizadores?.userNome,
                estado = projeto.estado,
                orcamento = projeto.orcamento,
                clienteNome = projeto.clienteNome
            };
        }
    }
}



