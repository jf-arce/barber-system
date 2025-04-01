using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class AppDbContext : DbContext
{

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {}

    public DbSet<User> Users { get; set; }
    public DbSet<Barber> Barbers { get; set; }
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<Skill> Skills { get; set; }
    public DbSet<Language> Languages { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<SocialNetwork> SocialNetworks { get; set; }
    public DbSet<Work> Works { get; set; }


    // protected override void OnModelCreating(ModelBuilder modelBuilder)
    // {
    //     foreach (var entity in modelBuilder.Model.GetEntityTypes())
    //     {
    //         foreach (var property in entity.GetProperties())
    //         {
    //             string columnName = ConvertToSnakeCase(property.Name);
    //             property.SetColumnName(columnName);
    //         }
    //     }

    //     modelBuilder.Entity<User>()
    //         .ToTable("users")
    //         .Property(u => u.CreatedAt)
    //         .HasDefaultValueSql("CURRENT_TIMESTAMP");

    //     modelBuilder.Entity<Barber>()
    //         .ToTable("barbers");
        
    //     modelBuilder.Entity<Skill>()
    //         .ToTable("skills");

    //     modelBuilder.Entity<Language>()
    //         .ToTable("languages");

    //     modelBuilder.Entity<Service>()
    //         .ToTable("services");
        
    //     modelBuilder.Entity<SocialNetwork>()
    //         .ToTable("social_networks");

    //     modelBuilder.Entity<Work>()
    //         .ToTable("works")
    //         .HasOne(w => w.Barber)
    //         .WithMany(b => b.Works)
    //         .HasForeignKey(w => w.BarberId)
    //         .OnDelete(DeleteBehavior.Cascade);

    //     // 🔹 Relación User → Review (quién escribe la review)
    //     modelBuilder.Entity<Review>()
    //         .ToTable("reviews")
    //         .HasOne(r => r.User)
    //         .WithMany(u => u.ReviewsWritten)
    //         .HasForeignKey(r => r.UserId)
    //         .OnDelete(DeleteBehavior.Cascade);

    //     // 🔹 Relación Barber → Review (quién recibe la review, pero sigue siendo un UserId)
    //     modelBuilder.Entity<Review>()
    //         .HasOne(r => r.Barber)
    //         .WithMany(b => b.ReviewsReceived)
    //         .HasForeignKey(r => r.BarberId)
    //         .OnDelete(DeleteBehavior.Cascade);

    //     modelBuilder.Entity<Appointment>()
    //         .ToTable("appointments")
    //         .HasOne(a => a.Barber)
    //         .WithMany(b => b.AppointmentsBarber)
    //         .HasForeignKey(a => a.BarberId)
    //         .OnDelete(DeleteBehavior.Cascade);

    //     modelBuilder.Entity<Appointment>()
    //         .HasOne(a => a.User)
    //         .WithMany(u => u.AppointmentsUser)
    //         .HasForeignKey(a => a.UserId)
    //         .OnDelete(DeleteBehavior.Cascade);
    // }

    // Función para convertir nombres a snake_case
    private static string ConvertToSnakeCase(string input)
    {
        return string.Concat(input.Select((x, i) => 
            i > 0 && char.IsUpper(x) ? "_" + x : x.ToString()
        )).ToLower();
    }
}
