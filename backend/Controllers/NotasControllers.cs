using System.Xml;
using backend.Data;
using backend.Models;
using System.Globalization;
using Microsoft.AspNetCore.Mvc;


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

    }
}
