using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class init3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "createdat",
                table: "users",
                newName: "created_at");

            migrationBuilder.RenameColumn(
                name: "birthdate",
                table: "users",
                newName: "birth_date");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "created_at",
                table: "users",
                newName: "createdat");

            migrationBuilder.RenameColumn(
                name: "birth_date",
                table: "users",
                newName: "birthdate");
        }
    }
}
