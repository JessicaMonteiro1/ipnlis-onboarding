using API.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Utilizadores> Utilizadores { get; set; }
        public DbSet<Projetos> Projetos { get; set; }
        public DbSet<Tarefas> Tarefas { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tarefas>()
                .HasOne(t => t.Utilizadores)
                .WithMany()
                .HasForeignKey(t => t.userID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Tarefas>()
                .HasOne(t => t.Projetos)
                .WithMany()
                .HasForeignKey(t => t.projetoID)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }


    
}
