using Microsoft.EntityFrameworkCore;
using Application.Interfaces;
using Application.Interfaces.Auth;
using Application.Services;
using Infrastructure.Data;
using Scalar.AspNetCore;
using Domain.Repositories;
using Infrastructure.Data.Repositories;
using Infrastructure.Auth;
using Presentation.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// BD connection
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseSqlite(builder.Configuration.GetConnectionString("SqliteConnection"))
);

// Dependency Injection
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IHashingService, BcryptService>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

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
