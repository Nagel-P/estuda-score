using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrocaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TrocaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("gerar-vale")]
        public async Task<ActionResult> GerarVale(int userId, int recompensaId)
        {
            var user = await _context.Users.FindAsync(userId);
            var recompensa = await _context.Recompensas.FindAsync(recompensaId);

            if (user == null || recompensa == null)
                return NotFound("Usuário ou recompensa não encontrada.");

            if (user.Pontos < recompensa.PontosNecessarios)
                return BadRequest("Pontos insuficientes.");

            // Desconta os pontos
            user.Pontos -= recompensa.PontosNecessarios;

            // Cria o vale
            var vale = new Vale
            {
                UserId = userId,
                RecompensaId = recompensaId
            };

            _context.Vales.Add(vale);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Mensagem = "Vale gerado com sucesso!",
                Codigo = vale.Codigo,
                Data = vale.DataGeracao
            });
        }
    }
}
