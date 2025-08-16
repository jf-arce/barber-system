using Microsoft.EntityFrameworkCore;
using Application.Interfaces;
using Application.Interfaces.Auth;
using Application.Services;
using Infrastructure.Data;
using Scalar.AspNetCore;
using Domain.Repositories;
using Infrastructure.Data.Repositories;
using Infrastructure.Auth;
using Microsoft.Extensions.Options;
using Presentation.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// BD connection
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresConnection"))
);

// Dependency Injection
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IHashingService, BcryptService>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IBarberService, BarberService>();
builder.Services.AddScoped<IAppointmentService, AppointmentService>();
builder.Services.AddScoped<IServiceService, ServiceService>();
builder.Services.AddScoped<IWorkService, WorkService>();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IBarberRepository, BarberRepository>();
builder.Services.AddScoped<IAppointmentRepository, AppointmentRepository>();
builder.Services.AddScoped<IServiceRepository, ServiceRepository>();
builder.Services.AddScoped<IWorkRepository, WorkRepository>();
builder.Services.AddScoped<IAppointmentDetailRepository, AppointmentDetailRepository>();

// JWT Authentication
builder.Services.AddJwtAuthentication(builder.Configuration);

//Cors
builder.Services.AddCorsConfig();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(options => 
    {
        options.Title = "Barber API";
        options.Theme = ScalarTheme.BluePlanet;
        options.CustomCss = "";
    });
}

app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
