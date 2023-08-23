﻿// <auto-generated />
using System;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace API.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20230803145327_New5")]
    partial class New5
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.20")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("API.Models.Projetos", b =>
                {
                    b.Property<Guid>("projetoID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("clienteNome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("estado")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("orcamento")
                        .HasColumnType("int");

                    b.Property<string>("projetoNome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("userID")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("projetoID");

                    b.HasIndex("userID");

                    b.ToTable("Projetos");
                });

            modelBuilder.Entity("API.Models.Tarefas", b =>
                {
                    b.Property<Guid>("tarefaID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("dataInicio")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("dataLimite")
                        .HasColumnType("datetime2");

                    b.Property<string>("estado")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("projetoID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("tarefaNome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("userID")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("tarefaID");

                    b.HasIndex("projetoID");

                    b.HasIndex("userID");

                    b.ToTable("Tarefas");
                });

            modelBuilder.Entity("API.Models.Utilizadores", b =>
                {
                    b.Property<Guid>("userID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("telefone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("token")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("userNome")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("userID");

                    b.ToTable("Utilizadores");
                });

            modelBuilder.Entity("API.Models.Projetos", b =>
                {
                    b.HasOne("API.Models.Utilizadores", "Utilizadores")
                        .WithMany()
                        .HasForeignKey("userID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Utilizadores");
                });

            modelBuilder.Entity("API.Models.Tarefas", b =>
                {
                    b.HasOne("API.Models.Projetos", "Projetos")
                        .WithMany()
                        .HasForeignKey("projetoID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("API.Models.Utilizadores", "Utilizadores")
                        .WithMany()
                        .HasForeignKey("userID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Projetos");

                    b.Navigation("Utilizadores");
                });
#pragma warning restore 612, 618
        }
    }
}
