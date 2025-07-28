using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class FixAppointmentRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AppointmentServices",
                table: "AppointmentServices");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppointmentServices",
                table: "AppointmentServices",
                columns: new[] { "AppointmentId", "ServiceId", "BarberId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AppointmentServices",
                table: "AppointmentServices");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppointmentServices",
                table: "AppointmentServices",
                columns: new[] { "AppointmentId", "ServiceId" });
        }
    }
}
