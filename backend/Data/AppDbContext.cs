using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Recompensa> Recompensas { get; set; }
        public DbSet<Vale> Vales { get; set; }
        public DbSet<Nota> Notas { get; set; }


    }
}