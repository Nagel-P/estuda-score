using backend.Data;
using backend.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NotasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> RegistrarNota(Nota Nota)
        {
            var user = await _context.Users.FindAsync(Nota.UserId);

            if (user == null)
                return NotFound("Usuário não encontrado.");

            var nota = new Nota
            {
                UserId = Nota.UserId,
                Disciplina = Nota.Disciplina,
                ValorNota = Nota.ValorNota,
                PontosGerados = (int)(Nota.ValorNota * 10),
                DataLancamento = DateTime.Now
            };

            user.Pontos += nota.PontosGerados;

            _context.Notas.Add(nota);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                nota.Id,
                nota.Disciplina,
                nota.ValorNota,
                nota.PontosGerados,
                nota.DataLancamento,
                user.Pontos
            });
        }
    }
}
