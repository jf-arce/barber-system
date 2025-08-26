## Etapa base: entorno de ejecución para producción
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

## Etapa de build: compila y publica la aplicación
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copiamos los archivos de proyecto para restaurar dependencias y cachear mejor
COPY src/Domain/Domain.csproj src/Domain/
COPY src/Application/Application.csproj src/Application/
COPY src/Infrastructure/Infrastructure.csproj src/Infrastructure/
COPY src/Presentation/Presentation.csproj src/Presentation/

# Restauramos dependencias del proyecto principal
RUN dotnet restore src/Presentation/Presentation.csproj

# Copiamos todo el código fuente
COPY . .

# Publicamos el proyecto Presentation (la entrada real) en modo Release
RUN dotnet publish src/Presentation/Presentation.csproj -c Release -o /app/publish

## Etapa final: imagen lista para producción
FROM base AS final
WORKDIR /app

# Copiamos la aplicación publicada desde la etapa de build
COPY --from=build /app/publish .

# Ejecutamos la API
ENTRYPOINT ["dotnet", "Presentation.dll"]
