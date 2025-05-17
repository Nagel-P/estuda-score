namespace backend.Models
{
    public class Nota
    {
        public int Id { get; set; } // ID da nota (chave primária)
        public int UserId { get; set; } // Chave estrangeira para o usuário
        public string Disciplina { get; set; }
        public double ValorNota { get; set; }
        public int PontosGerados { get; set; } // Pontos calculados com base na nota
        public DateTime DataLancamento { get; set; } // Data de lançamento da nota

    }
}
