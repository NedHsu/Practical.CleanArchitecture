using System;
using System.Data;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace ClassifiedAds.Persistence {
    public partial class StockDbContext : DbContext, IUnitOfWork {
        public StockDbContext() { }

        public StockDbContext(DbContextOptions<StockDbContext> options) : base(options) { }

        public virtual DbSet<stock> Stocks { get; set; }
        public virtual DbSet<stockDay> StockDays { get; set; }
        public virtual DbSet<stock_fundamental> StockFundamentals { get; set; }
        public virtual DbSet<stock_funder> StockFunders { get; set; }

        public void BeginTransaction(IsolationLevel isolationLevel = IsolationLevel.ReadCommitted) {
            throw new NotImplementedException();
        }

        public void CommitTransaction() {
            throw new NotImplementedException();
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

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}