#!/bin/bash

# Verifica que se haya pasado un nombre de migración
if [ -z "$1" ]; then
    echo "Uso: ./scripts/migrar.sh NombreDeLaMigracion"
    exit 1
fi

INFRASTRUCTURE_DIR="D:\Repositorios\SistemaPeluqueria\src\Infrastructure"
PRESENTATION_DIR="D:\Repositorios\SistemaPeluqueria\src\Presentation"

# Ejecutar la migración desde Infrastructure con el startup en Presentation
cd "$INFRASTRUCTURE_DIR" || exit
dotnet ef migrations add "$1" --startup-project "$PRESENTATION_DIR" --project . --output-dir Data/Migrations
dotnet ef database update --startup-project "$PRESENTATION_DIR" --project .

echo "✅ Migración '$1' creada exitosamente."
