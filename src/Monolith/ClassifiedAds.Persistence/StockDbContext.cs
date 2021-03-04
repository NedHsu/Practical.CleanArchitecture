using System;
using System.Data;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage;

#nullable disable

namespace ClassifiedAds.Persistence {
    public partial class StockDbContext : DbContext, IUnitOfWork
    {
        public StockDbContext() { }

        public StockDbContext(DbContextOptions<StockDbContext> options)
            : base(options) { }

        public virtual DbSet<stock> Stocks { get; set; }
        public virtual DbSet<stockDay> StockDays { get; set; }
        public virtual DbSet<stock_fundamental> StockFundamentals { get; set; }
        public virtual DbSet<stock_funder> StockFunders { get; set; }
        public virtual DbSet<StockGroup> StockGroups { get; set; }
        public virtual DbSet<StockGroupItem> StockGroupItems { get; set; }
        public virtual DbSet<StockNote> StockNotes { get; set; }

        private IDbContextTransaction _dbContextTransaction;

        public void BeginTransaction(IsolationLevel isolationLevel = IsolationLevel.ReadCommitted) {
            _dbContextTransaction = Database.BeginTransaction(isolationLevel);
        }

        public void CommitTransaction() {
            _dbContextTransaction.Commit();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {

            modelBuilder.Entity<stock>(entity =>
            {
                entity.HasKey(e => e.code)
                    .HasName("PK_stock_1");

                entity.ToTable("stock");

                entity.Property(e => e.code)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.CFICode)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.ISINCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.close_price).HasColumnType("decimal(8, 2)");

                entity.Property(e => e.ex)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.fetchDate).HasColumnType("date");

                entity.Property(e => e.five_price).HasColumnType("decimal(8, 2)");

                entity.Property(e => e.industry).HasMaxLength(10);

                entity.Property(e => e.listing_date).HasColumnType("date");

                entity.Property(e => e.name).HasMaxLength(50);

                entity.Property(e => e.note).HasMaxLength(100);

                entity.Property(e => e.sixty_price).HasColumnType("decimal(8, 2)");

                entity.Property(e => e.ten_price).HasColumnType("decimal(8, 2)");

                entity.Property(e => e.twenty_price).HasColumnType("decimal(8, 2)");
            });

            modelBuilder.Entity<stockDay>(entity =>
            {
                entity.HasKey(e => new { e.stock_code, e.date });

                entity.ToTable("stockDay");

                entity.Property(e => e.stock_code)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.date).HasColumnType("date");

                entity.Property(e => e.close_price).HasColumnType("decimal(8, 2)");

                entity.Property(e => e.highest_price).HasColumnType("decimal(8, 2)");

                entity.Property(e => e.lowest_price).HasColumnType("decimal(8, 2)");

                entity.Property(e => e.open_price).HasColumnType("decimal(8, 2)");

                entity.HasOne(d => d.stock_codeNavigation)
                    .WithMany(p => p.stockDays)
                    .HasForeignKey(d => d.stock_code)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_stockDay_stock");
            });

            modelBuilder.Entity<stock_fundamental>(entity =>
            {
                entity.HasKey(e => new { e.stock_code, e.date });

                entity.ToTable("stock_fundamental");

                entity.Property(e => e.stock_code)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.date).HasColumnType("date");

                entity.Property(e => e.created).HasColumnType("datetime");

                entity.Property(e => e.pe_ratio).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.price_net_ratio).HasColumnType("decimal(5, 2)");

                entity.Property(e => e.report_year_quarter)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.stock_name).HasMaxLength(50);

                entity.Property(e => e.updated).HasColumnType("datetime");

                entity.Property(e => e.yield_rate).HasColumnType("decimal(5, 2)");
            });

            modelBuilder.Entity<stock_funder>(entity =>
            {
                entity.HasKey(e => new { e.stock_code, e.date });

                entity.ToTable("stock_funder");

                entity.Property(e => e.stock_code)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.date).HasColumnType("date");
            });

            modelBuilder.Entity<StockGroup>(entity =>
            {
                entity.ToTable("StockGroup");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.GroupTitle).HasMaxLength(50);
            });

            modelBuilder.Entity<StockGroupItem>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.StockCode)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.HasOne(d => d.StockCodeNavigation)
                    .WithMany(p => p.StockGroupItems)
                    .HasForeignKey(d => d.StockCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_stock_group_items_stock");
            });

            modelBuilder.Entity<StockNote>(entity =>
            {
                entity.ToTable("StockNote");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Contents).HasMaxLength(500);

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.StockCode)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.HasOne(d => d.StockCodeNavigation)
                    .WithMany(p => p.StockNotes)
                    .HasForeignKey(d => d.StockCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_stock_note_stock");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}