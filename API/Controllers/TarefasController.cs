using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models.DTO;
using API.Models;

namespace APIGestaoProjetos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarefasController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public TarefasController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        // POST: api/Tarefas
        [HttpPost]
        public async Task<IActionResult> AddTarefa([FromBody] TarefaRequestDto tarefaRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var novaTarefa = new Tarefas
            {
                tarefaID = Guid.NewGuid(),
                tarefaNome = tarefaRequestDto.tarefaNome,
                estado = tarefaRequestDto.estado,
                dataInicio = tarefaRequestDto.dataInicio,
                dataLimite = tarefaRequestDto.dataLimite
            };

            var utilizador = await _applicationDbContext.Utilizadores
                .FirstOrDefaultAsync(u => u.userNome == tarefaRequestDto.userNome);

            if (utilizador == null)
            {
                return BadRequest("Utilizador não encontrado.");
            }

            novaTarefa.userID = utilizador.userID;
            novaTarefa.Utilizadores = utilizador;

            var projeto = await _applicationDbContext.Projetos
                .FirstOrDefaultAsync(p => p.projetoNome == tarefaRequestDto.projetoNome);

            if (projeto != null)
            {
                novaTarefa.projetoID = projeto.projetoID;
                novaTarefa.Projetos = projeto;
            }

            await _applicationDbContext.Tarefas.AddAsync(novaTarefa);
            await _applicationDbContext.SaveChangesAsync();

            return Ok(MapTarefaToDTO(novaTarefa));
        }

        // PUT: api/Tarefas/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTarefa(Guid id, [FromBody] TarefaRequestDto tarefaRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingTarefa = await _applicationDbContext.Tarefas.FirstOrDefaultAsync(t => t.tarefaID == id);

            if (existingTarefa == null)
            {
                return NotFound();
            }

            existingTarefa.tarefaNome = tarefaRequestDto.tarefaNome;
            existingTarefa.estado = tarefaRequestDto.estado;
            existingTarefa.dataInicio = tarefaRequestDto.dataInicio;
            existingTarefa.dataLimite = tarefaRequestDto.dataLimite;

            var programador = await _applicationDbContext.Utilizadores
                .FirstOrDefaultAsync(u => u.userNome == tarefaRequestDto.userNome);

            if (programador == null)
            {
                return BadRequest("Programador não encontrado.");
            }

            existingTarefa.userID = programador.userID;
            existingTarefa.Utilizadores = programador;

            var projeto = await _applicationDbContext.Projetos
                .FirstOrDefaultAsync(p => p.projetoNome == tarefaRequestDto.projetoNome);

            if (projeto != null)
            {
                existingTarefa.projetoID = projeto.projetoID;
                existingTarefa.Projetos = projeto;
            }

            await _applicationDbContext.SaveChangesAsync();

            return Ok(MapTarefaToDTO(existingTarefa));
        }


        // GET: api/Tarefas
        [HttpGet]
            public async Task<IActionResult> GetAllTarefas()
            {
                var tarefas = await _applicationDbContext.Tarefas
                    .Include(t => t.Utilizadores)
                    .Include(t => t.Projetos)
                    .ToListAsync();

                var tarefasDTO = tarefas.Select(tarefa => MapTarefaToDTO(tarefa)).ToList();

                return Ok(tarefasDTO);
            }

            // GET: api/Tarefas/{id}
            [HttpGet("{id}")]
            public async Task<IActionResult> GetTarefa(Guid id)
            {
                var tarefa = await _applicationDbContext.Tarefas
                    .Include(t => t.Utilizadores)
                    .Include(t => t.Projetos)
                    .FirstOrDefaultAsync(t => t.tarefaID == id);

                if (tarefa == null)
                {
                    return NotFound();
                }

                return Ok(MapTarefaToDTO(tarefa));
            }

            // DELETE: api/Tarefas/{id}
            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteTarefa(Guid id)
            {
                var tarefa = await _applicationDbContext.Tarefas
                    .FirstOrDefaultAsync(t => t.tarefaID == id);

                if (tarefa == null)
                {
                    return NotFound();
                }

                _applicationDbContext.Tarefas.Remove(tarefa);
                await _applicationDbContext.SaveChangesAsync();

                return Ok(MapTarefaToDTO(tarefa));
            }

            // Método para mapear uma tarefa para o DTO
            private TarefaRequestDto MapTarefaToDTO(Tarefas tarefa)
            {
                return new TarefaRequestDto
                {
                    tarefaID = tarefa.tarefaID,
                    tarefaNome = tarefa.tarefaNome,
                    userNome = tarefa.Utilizadores?.userNome,
                    projetoNome = tarefa.Projetos?.projetoNome,
                    estado = tarefa.estado,
                    dataInicio = tarefa.dataInicio,
                    dataLimite = tarefa.dataLimite
                };
            }
        }
    }

    
