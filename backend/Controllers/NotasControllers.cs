using System.Xml;
using backend.Data;
using backend.Models;
using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using System.Text;
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

    }
}
