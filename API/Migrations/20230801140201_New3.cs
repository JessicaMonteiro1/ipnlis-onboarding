using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class New3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Utilizadores",
                columns: table => new
                {
                    userID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    userNome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    telefone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    token = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Utilizadores", x => x.userID);
                });

            migrationBuilder.CreateTable(
                name: "Projetos",
                columns: table => new
                {
                    projetoID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    projetoNome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    estado = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    userID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    orcamento = table.Column<int>(type: "int", nullable: false),
                    clienteNome = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projetos", x => x.projetoID);
                    table.ForeignKey(
                        name: "FK_Projetos_Utilizadores_userID",
                        column: x => x.userID,
                        principalTable: "Utilizadores",
                        principalColumn: "userID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tarefas",
                columns: table => new
                {
                    tarefaID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    tarefaNome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    userID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    projetoID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    estado = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    dataInicio = table.Column<DateTime>(type: "datetime2", nullable: true),
                    dataLimite = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tarefas", x => x.tarefaID);
                    table.ForeignKey(
                        name: "FK_Tarefas_Projetos_projetoID",
                        column: x => x.projetoID,
                        principalTable: "Projetos",
                        principalColumn: "projetoID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Tarefas_Utilizadores_userID",
                        column: x => x.userID,
                        principalTable: "Utilizadores",
                        principalColumn: "userID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Projetos_userID",
                table: "Projetos",
                column: "userID");

            migrationBuilder.CreateIndex(
                name: "IX_Tarefas_projetoID",
                table: "Tarefas",
                column: "projetoID");

            migrationBuilder.CreateIndex(
                name: "IX_Tarefas_userID",
                table: "Tarefas",
                column: "userID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tarefas");

            migrationBuilder.DropTable(
                name: "Projetos");

            migrationBuilder.DropTable(
                name: "Utilizadores");
        }
    }
}
