using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Recompensa
    {
         public int Id { get; set; } 
        public string Nome { get; set; } 
        public string Descricao { get; set; } 
        public int PontosNecessarios { get; set; }
    }
}