using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Infrastructure.Data;

public class AppDbContext : DbContext
{

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    { }

    public DbSet<User> Users { get; set; }
    public DbSet<Barber> Barbers { get; set; }
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<Language> Languages { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<SocialNetwork> SocialNetworks { get; set; }
    public DbSet<Work> Works { get; set; }
    public DbSet<AppointmentServices> AppointmentServices { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(u => u.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.Property(u => u.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .ValueGeneratedOnAddOrUpdate();
            
            entity.HasQueryFilter(u => !u.IsDeleted);
            
            entity.Property(u => u.Name).HasMaxLength(50);
            entity.Property(u => u.Surname).HasMaxLength(50);
            entity.Property(u => u.Email).HasMaxLength(255);
            entity.Property(u => u.Password).HasMaxLength(255);
            entity.Property(u => u.Gender).HasMaxLength(10);
            entity.Property(u => u.Role).HasMaxLength(10);
            entity.Property(u => u.IsDeleted).HasDefaultValue(false);
        });

        modelBuilder.Entity<Barber>(entity =>
        {
            entity.HasKey(b => b.UserId);

            entity
                .HasOne(b => b.User)
                .WithOne(u => u.Barber)
                .HasForeignKey<Barber>(b => b.UserId);

            entity
                .HasMany(b => b.Languages)
                .WithMany(l => l.Barbers);

            entity
                .HasMany(b => b.SocialNetworks)
                .WithMany(sn => sn.Barbers);
        });

        modelBuilder.Entity<Service>(entity =>
        {
            entity.Property(s => s.Name).HasMaxLength(50);
            entity.Property(s => s.Price).HasPrecision(10, 2);
            entity.Property(s => s.Duration).HasDefaultValue(1);
        });

        modelBuilder.Entity<Language>(entity =>
        {
            entity.Property(l => l.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<SocialNetwork>(entity =>
        {
            entity.Property(sn => sn.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.Property(r => r.CreatedAt)
            .HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(r => r.User)
             .WithMany(u => u.Reviews)
             .HasForeignKey(r => r.UserId)
             .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(r => r.Barber)
             .WithMany(b => b.Reviews)
             .HasForeignKey(r => r.BarberId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Work>(entity =>
        {
            entity.HasOne(w => w.Barber)
             .WithMany(b => b.Works)
             .HasForeignKey(w => w.BarberId)
             .OnDelete(DeleteBehavior.Cascade);

            entity.Property(w => w.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<Appointment>(entity =>
        {
            entity.Property(a => a.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");
            
            entity.HasOne(a => a.User)
             .WithMany(u => u.Appointments)
             .HasForeignKey(a => a.UserId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<AppointmentServices>(entity =>
        {
            entity.HasKey(x => new { x.AppointmentId, x.ServiceId });
            
            entity
                .HasOne(a => a.Appointment)
                .WithMany(a => a.AppointmentServices)
                .OnDelete(DeleteBehavior.Cascade);
            
            entity
                .HasOne(a => a.Service)
                .WithMany(s => s.AppointmentServices)
                .OnDelete(DeleteBehavior.Cascade);
            
            entity
                .HasOne(a => a.Barber)
                .WithMany(b => b.AppointmentServices)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
