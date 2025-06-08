using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        private readonly JwtService _jwtService;


        public UsersController(AppDbContext appDbContext, JwtService jwtService)
        {
            _appDbContext = appDbContext;
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto login)
        {
            var user = await _appDbContext.Users.FirstOrDefaultAsync(u => u.Email == login.Email);

            if (user == null || user.Password != login.Password)
                return Unauthorized("Credenciais inválidas");

            var token = _jwtService.GenerateToken(user.Id, user.Username, user.Role);

            return Ok(new { Token = token, Role = user.Role });
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> ObterUsuarios()
        {
            var usuarios = await _appDbContext.Users.ToListAsync();
            return Ok(usuarios);
        }

        // GET: api/users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> ObterUsuarioPorId(int id)
        {
            var usuario = await _appDbContext.Users.FindAsync(id);

            if (usuario == null)
                return NotFound($"Usuário com o ID {id} não foi encontrado.");

            return Ok(usuario);
        }

        [HttpPost]
        public async Task<ActionResult<User>> AddUser(User user)
        {

            if (user == null)
            {
                return BadRequest("Dados inválidos");
            }

            _appDbContext.Users.Add(user);
            await _appDbContext.SaveChangesAsync();

            return Ok(user);
        }
        // PUT: api/users/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarUsuario(int id, [FromBody] User usuarioAtualizado)
        {
            var usuarioExistente = await _appDbContext.Users.FindAsync(id);

            if (usuarioExistente == null)
                return NotFound($"Usuário com o ID {id} não foi encontrado.");

            _appDbContext.Entry(usuarioExistente).CurrentValues.SetValues(usuarioAtualizado);
            await _appDbContext.SaveChangesAsync();

            return Ok("Usuário atualizado com sucesso.");
        }

        // DELETE: api/users/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletarUsuario(int id)
        {
            var usuario = await _appDbContext.Users.FindAsync(id);

            if (usuario == null)
                return NotFound($"Usuário com o ID {id} não foi encontrado.");

            _appDbContext.Users.Remove(usuario);
            await _appDbContext.SaveChangesAsync();

            return Ok("Usuário removido com sucesso.");
        }

        [HttpGet("alunos")]
        public async Task<IActionResult> GetAlunos() {
            var alunos = await _appDbContext.Users
            .Where(u => EF.Functions.Like(u.Role.ToLower(), "%alun%"))
            .ToListAsync();
            return Ok(alunos);
        }


    }
}