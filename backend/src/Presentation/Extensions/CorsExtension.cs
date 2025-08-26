using Microsoft.Extensions.Configuration;

namespace Presentation.Extensions;

public static class CorsExtension
{
    public static IServiceCollection AddCorsConfig(this IServiceCollection services, IConfiguration configuration)
    {
        var origins = configuration["CORS:Origins"];
        var allowedOrigins = string.IsNullOrWhiteSpace(origins)
            ? ["http://localhost:3000"]
            : origins.Split(',', StringSplitOptions.RemoveEmptyEntries);

        services.AddCors(options =>
        {
            options.AddPolicy("AllowAll",
                policy =>
                {
                    policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });

            options.AddPolicy("AllowSpecificOrigin",
                policy =>
                {
                    policy.WithOrigins(allowedOrigins)
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials();
                });
        });

        return services;
    }
}