using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class AppDbContext : DbContext
{

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {}

    public DbSet<User> Users { get; set; } = null!;


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var entity in modelBuilder.Model.GetEntityTypes())
        {
            foreach (var property in entity.GetProperties())
            {
                string columnName = ConvertToSnakeCase(property.Name);
                property.SetColumnName(columnName);
            }
        }

        modelBuilder.Entity<User>()
            .ToTable("users")
            .Property(u => u.CreatedAt)
            .HasDefaultValueSql("CURRENT_TIMESTAMP");
    }
    // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    // {
    //     if (!optionsBuilder.IsConfigured)
    //     {
    //         optionsBuilder.UseSqlServer("Server=localhost;Database=Peluqueria;User Id=sa;Password=12345678;TrustServerCertificate=True;");
    //     }

    // }
    // Función para convertir nombres a snake_case
    private static string ConvertToSnakeCase(string input)
    {
        return string.Concat(input.Select((x, i) => 
            i > 0 && char.IsUpper(x) ? "_" + x : x.ToString()
        )).ToLower();
    }
}
