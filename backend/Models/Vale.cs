using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Vale
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int RecompensaId { get; set; }
        public DateTime DataGeracao { get; set; } = DateTime.Now;
        public string Codigo { get; set; } = Guid.NewGuid().ToString().Substring(0, 8).ToUpper();

        public User? User { get; set; }
        public Recompensa? Recompensa { get; set; }
    }
}