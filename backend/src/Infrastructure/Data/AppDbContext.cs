using Domain.Entities;
using Domain.Enums;
using Domain.Enums.User;
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
    public DbSet<Service> Services { get; set; }
    public DbSet<SocialNetwork> SocialNetworks { get; set; }
    public DbSet<Work> Works { get; set; }
    public DbSet<AppointmentServices> AppointmentServices { get; set; }
    public DbSet<BarberWorkSchedule> BarberWorkSchedules { get; set; }
    
    //Enums
    public DbSet<UserRole> UserRoles { get; set; }
    public DbSet<UserGender> UserGenders { get; set; }
    public DbSet<AppointmentStatus> AppointmentsStatus { get; set; }
    public DbSet<SocialNetworkName> SocialNetworkNames { get; set; }
    
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(u => u.CreatedAt)
                .HasDefaultValueSql(SqlConstants.CurrentTimestamp)
                .ValueGeneratedOnAdd();

            entity.Property(u => u.UpdatedAt)
                .HasDefaultValueSql(SqlConstants.CurrentTimestamp)
                .ValueGeneratedOnAddOrUpdate();
            
            entity.HasQueryFilter(u => !u.IsDeleted);
            
            entity.Property(u => u.Name).HasMaxLength(50);
            entity.Property(u => u.Surname).HasMaxLength(50);
            entity.Property(u => u.Email).HasMaxLength(255);
            entity.Property(u => u.Password).HasMaxLength(255);
            entity.Property(u => u.Gender).HasMaxLength(10);
            entity.Property(u => u.Role).HasMaxLength(10);
            entity.Property(u => u.Phone).HasMaxLength(20);
            entity.Property(u => u.IsDeleted).HasDefaultValue(false);

            entity
                .HasIndex(u => u.Email)
                .IsUnique();
        });

        modelBuilder.Entity<Barber>(entity =>
        {
            entity.HasKey(b => b.UserId);

            entity
                .HasOne(b => b.User)
                .WithOne(u => u.Barber)
                .HasForeignKey<Barber>(b => b.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<BarberWorkSchedule>(entity =>
        {
            entity
                .Property(b => b.DayOfWeek)
                .HasConversion(
                    d => d.ToString(),// C# → DB (string)
                    d => Enum.Parse<DayOfWeek>(d) // DB (string) → C#
                )
                .HasMaxLength(10);

            entity
                .HasOne(bw => bw.Barber)
                .WithMany(b => b.BarberWorkSchedules)
                .HasForeignKey(bw => bw.BarberId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Service>(entity =>
        {
            entity.Property(s => s.Name).HasMaxLength(50);
            entity.Property(s => s.Price).HasPrecision(10, 2);
            entity.Property(s => s.Duration).HasDefaultValue(1);
        });

        modelBuilder.Entity<SocialNetwork>(entity =>
        {
            entity.Property(sn => sn.Name).HasMaxLength(50);
            entity
                .HasOne(sn => sn.Barber)
                .WithMany(b => b.SocialNetworks)
                .HasForeignKey(fk => fk.BarberId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.Property(r => r.CreatedAt)
                .HasDefaultValueSql(SqlConstants.CurrentTimestamp)
                .ValueGeneratedOnAdd();

            entity.Property(u => u.UpdatedAt)
                .HasDefaultValueSql(SqlConstants.CurrentTimestamp)
                .ValueGeneratedOnAddOrUpdate();

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
                .HasDefaultValueSql(SqlConstants.CurrentTimestamp)
                .ValueGeneratedOnAdd();
            
            entity.Property(a => a.UpdatedAt)
                .HasDefaultValueSql(SqlConstants.CurrentTimestamp)
                .ValueGeneratedOnAddOrUpdate();
            
            entity.HasOne(a => a.User)
             .WithMany(u => u.Appointments)
             .HasForeignKey(a => a.UserId)
             .OnDelete(DeleteBehavior.Cascade);

            entity.Property(a => a.Status)
                .HasMaxLength(20);
        });

        modelBuilder.Entity<AppointmentServices>(entity =>
        {
            entity.HasKey(x => new { x.AppointmentId, x.ServiceId, x.BarberId });

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
        
        //Enums
        modelBuilder.Entity<UserRole>(entity =>
        {
            entity
                .Property(ur => ur.Name)
                .HasMaxLength(20);
            entity
                .HasIndex(ur => ur.Name)
                .IsUnique();
            
            entity.HasData(
                Enum.GetValues<UserRolesEnum>().Select(role => new UserRole
                {
                    Id = (int)role,
                    Name = role.ToString()
                })
            );
        });

        modelBuilder.Entity<UserGender>(entity =>
        {
            entity
                .Property(ug => ug.Name)
                .HasMaxLength(20);
            entity
                .HasIndex(ug => ug.Name)
                .IsUnique();
            
            entity.HasData(
                Enum.GetValues<UserGenderEnum>().Select(gender => new UserGender
                {
                    Id = (int)gender,
                    Name = gender.ToString()
                })
            );
        });
        
        modelBuilder.Entity<AppointmentStatus>(entity =>
        {
            entity
                .Property(a => a.Name)
                .HasMaxLength(20);
            entity
                .HasIndex(a => a.Name)
                .IsUnique();
            
            entity.HasData(
                Enum.GetValues<AppointmentStatusEnum>().Select(status => new AppointmentStatus
                {
                    Id = (int)status,
                    Name = status.ToString()
                })
            );
        });
        
        modelBuilder.Entity<SocialNetworkName>(entity =>
        {
            entity
                .Property(snn => snn.Name)
                .HasMaxLength(20);
            entity
                .HasIndex(snn => snn.Name)
                .IsUnique();
            
            entity.HasData(
                Enum.GetValues<SocialNetworkEnum>().Select(snn => new SocialNetworkName
                {
                    Id = (int)snn,
                    Name = snn.ToString()
                })
            );
        });
    }
}
