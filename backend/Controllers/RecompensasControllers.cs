using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecompensasControllers : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public RecompensasControllers(AppDbContext appDbContext) {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recompensa>>> MostrarRecompensas()
        {
            var recompensas = await _appDbContext.Recompensas.ToListAsync();
            return Ok(recompensas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> ObterRecompensa(int id)
        {
            var recompensa = await _appDbContext.Recompensas.FindAsync(id);

            if (recompensa == null)
                return NotFound($"Recompensa com o ID {id} não foi encontrado.");

            return Ok(recompensa);
        }

        [HttpPost]
        public async Task<ActionResult<User>> AddRecompensa (Recompensa recompensa){
            
            if (recompensa == null){
                return BadRequest("Dados inválidos");
            }

            _appDbContext.Recompensas.Add(recompensa);
            await _appDbContext.SaveChangesAsync();

            return Ok(recompensa);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarRecompensa(int id, [FromBody] Recompensa recompensaAtualizada)
        {
            var recompensaExistente = await _appDbContext.Recompensas.FindAsync(id);

            if (recompensaExistente == null)
                return NotFound($"Recompensa com o ID {id} não foi encontrado.");

            _appDbContext.Entry(recompensaExistente).CurrentValues.SetValues(recompensaAtualizada);
            await _appDbContext.SaveChangesAsync();

            return Ok("Recompensa atualizado com sucesso.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletarRecompensa(int id)
        {
            var recompensa = await _appDbContext.Recompensas.FindAsync(id);

            if (recompensa == null)
                return NotFound($"Recompensa com o ID {id} não foi encontrado.");

            _appDbContext.Recompensas.Remove(recompensa);
            await _appDbContext.SaveChangesAsync();

            return Ok("Recompensa removido com sucesso.");
        }
    }
}