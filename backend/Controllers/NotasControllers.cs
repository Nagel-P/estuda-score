using System.Xml;
using backend.Data;
using backend.Models;
using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;


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

        [HttpPost("importar-xml")]
        public async Task<IActionResult> ImportarNotasXml(IFormFile xmlFile)
        {
            if (xmlFile == null || xmlFile.Length == 0)
                return BadRequest("Arquivo XML não enviado.");

            var notasImportadas = new List<Nota>();

            using (var stream = xmlFile.OpenReadStream())
            {
                var xmlDoc = new System.Xml.XmlDocument();
                xmlDoc.Load(stream);

                XmlNodeList notaNodes = xmlDoc.SelectNodes("/Notas/Nota");

                foreach (XmlNode node in notaNodes)
                {
                    int userId = int.Parse(node["UserId"]?.InnerText ?? "0");
                    string disciplina = node["Disciplina"]?.InnerText;
                    double valorNota = double.Parse(node["ValorNota"]?.InnerText, CultureInfo.InvariantCulture);

                    var user = await _context.Users.FindAsync(userId);
                    if (user == null) continue;

                    var novaNota = new Nota
                    {
                        UserId = userId,
                        Disciplina = disciplina,
                        ValorNota = valorNota,
                        PontosGerados = (int)(valorNota * 10),
                        DataLancamento = DateTime.Now
                    };

                    user.Pontos += novaNota.PontosGerados;

                    _context.Notas.Add(novaNota);
                    notasImportadas.Add(novaNota);
                }

                await _context.SaveChangesAsync();
            }

            return Ok(new
            {
                Mensagem = $"{notasImportadas.Count} nota(s) importada(s) com sucesso.",
                notasImportadas
            });
        }

        [HttpGet("exportar-xml")]
        public async Task<IActionResult> ExportarNotasXml()
        {
            var notas = await _context.Notas.ToListAsync();

            var xmlSettings = new XmlWriterSettings
            {
                Indent = true,
                Encoding = Encoding.UTF8,
                CloseOutput = false // <-- ESSENCIAL
            };

            var stream = new MemoryStream();

            using (var writer = XmlWriter.Create(stream, xmlSettings))
            {
                writer.WriteStartDocument();
                writer.WriteStartElement("Notas");

                foreach (var nota in notas)
                {
                    writer.WriteStartElement("Nota");

                    writer.WriteElementString("UserId", nota.UserId.ToString());
                    writer.WriteElementString("Disciplina", nota.Disciplina);
                    writer.WriteElementString("ValorNota", nota.ValorNota.ToString(CultureInfo.InvariantCulture));
                    writer.WriteElementString("PontosGerados", nota.PontosGerados.ToString());
                    writer.WriteElementString("DataLancamento", nota.DataLancamento.ToString("yyyy-MM-ddTHH:mm:ss"));

                    writer.WriteEndElement(); // </Nota>
                }

                writer.WriteEndElement(); // </Notas>
                writer.WriteEndDocument();
            }

            stream.Position = 0;

            return File(stream, "application/xml", "notas_exportadas.xml");
        }

        [HttpGet]
        public async Task<IActionResult> GetNotas()
        {
            var notas = await _context.Notas.ToListAsync();
            return Ok(notas);
        }

        [HttpPost]
        public async Task<IActionResult> PostNota([FromBody] Nota nota)
        {
            var user = await _context.Users.FindAsync(nota.UserId);
            if (user == null) return NotFound("Usuário não encontrado.");

            nota.PontosGerados = (int)(nota.ValorNota * 10);
            nota.DataLancamento = DateTime.Now;

            user.Pontos += nota.PontosGerados;

            _context.Notas.Add(nota);
            await _context.SaveChangesAsync();

            return Ok(nota);
        }

        [HttpPost("batch")]
        public async Task<IActionResult> PostNotasBatch([FromBody] List<NotaDto> lista) {
            foreach (var dto in lista) {
                var nota = new Nota {
                    UserId = dto.UserId,
                    Disciplina = dto.Disciplina,
                    ValorNota = dto.ValorNota,
                    PontosGerados = (int)(dto.ValorNota * 10),
                    DataLancamento = DateTime.Now
                };

                var user = await _context.Users.FindAsync(dto.UserId);
                if (user != null)
                {
                    user.Pontos += nota.PontosGerados;
                    _context.Notas.Add(nota);
                }
            }

            await _context.SaveChangesAsync();
            return Ok("Notas salvas com sucesso!");
        }
        
        [HttpGet("resumo/{userId}")]
        public async Task<IActionResult> GetResumoNotas(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return NotFound("Usuário não encontrado.");

            var notas = await _context.Notas
                .Where(n => n.UserId == userId)
                .ToListAsync();

            double mediaNotas = notas.Count > 0 ? notas.Average(n => n.ValorNota) : 0;

            return Ok(new
            {
                Pontos = user.Pontos,
                MediaNotas = Math.Round(mediaNotas, 2)
            });
        }

        [Authorize]
        [HttpGet("resumo-completo")]
        public async Task<IActionResult> GetResumoCompleto()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);

            var resumo = await _context.Notas
                .Where(n => n.UserId == userId)
                .GroupBy(n => n.UserId)
                .Select(g => new
                {
                    Pontos = g.Sum(n => n.PontosGerados),
                    MediaNotas = g.Average(n => n.ValorNota),
                    Notas = g.Select(n => new
                    {
                        n.Id,
                        n.Disciplina,
                        n.ValorNota,
                        n.PontosGerados,
                        DataLancamento = n.DataLancamento.ToString("dd/MM/yyyy")
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (resumo == null)
                return NotFound(new { Mensagem = "Nenhuma nota encontrada." });

            return Ok(resumo);
        }
    }



        public class NotaDto
        {
            public int UserId { get; set; }
            public string Disciplina { get; set; }
            public double ValorNota { get; set; }
        }


    }

