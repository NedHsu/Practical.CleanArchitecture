using System;
using System.Data;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage;

#nullable disable

namespace ClassifiedAds.Persistence
{
    public partial class StockDbContext : DbContext, IUnitOfWork
    {
        public StockDbContext()
        {
        }

        public StockDbContext(DbContextOptions<StockDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Stock> Stocks { get; set; }
        public virtual DbSet<StockDay> StockDays { get; set; }
        public virtual DbSet<StockMargin> StockMargins { get; set; }
        public virtual DbSet<StockRevenue> StockRevenues { get; set; }
        public virtual DbSet<StockFundamental> StockFundamentals { get; set; }
        public virtual DbSet<StockFunder> StockFunders { get; set; }
        public virtual DbSet<StockGroup> StockGroups { get; set; }
        public virtual DbSet<StockGroupItem> StockGroupItems { get; set; }
        public virtual DbSet<StockNote> StockNotes { get; set; }
        public virtual DbSet<StockProfit> StockProfits { get; set; }
        public virtual DbSet<StockSeminar> StockSeminars { get; set; }
        public virtual DbSet<StockNew> StockNews { get; set; }
        public virtual DbSet<StockInsiderTransaction> StockInsiderTransactions { get; set; }

        private IDbContextTransaction _dbContextTransaction;

        public void BeginTransaction(IsolationLevel isolationLevel = IsolationLevel.ReadCommitted)
        {
            _dbContextTransaction = Database.BeginTransaction(isolationLevel);
        }

        public void CommitTransaction()
        {
            _dbContextTransaction.Commit();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Stock>(entity =>
            {
                entity.HasKey(e => e.Code)
                    .HasName("PK_stock_1");

                entity.ToTable("Stock");

                entity.Property(e => e.Code)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.CFICode)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.ISINCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ClosePrice).HasColumnType("decimal(8, 2)");

                entity.Property(e => e.Ex)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.FetchDate).HasColumnType("date");

                entity.Property(e => e.FivePrice).HasColumnType("decimal(8, 2)");

                entity.Property(e => e.Industry).HasMaxLength(10);

                entity.Property(e => e.ListingDate).HasColumnType("date");

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.Note).HasMaxLength(100);

                entity.Property(e => e.SixtyPrice).HasColumnType("decimal(8, 2)");

                entity.Property(e => e.TenPrice).HasColumnType("decimal(8, 2)");

                entity.Property(e => e.TwentyPrice).HasColumnType("decimal(8, 2)");
            });

            modelBuilder.Entity<StockDay>(entity =>
            {
                entity.HasKey(e => new { e.StockCode, e.Date });

                entity.ToTable("StockDay");

                entity.Property(e => e.StockCode)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.ClosePrice).HasColumnType("decimal(8, 2)");

                entity.Property(e => e.HighestPrice).HasColumnType("decimal(8, 2)");

                entity.Property(e => e.LowestPrice).HasColumnType("decimal(8, 2)");

                entity.Property(e => e.OpenPrice).HasColumnType("decimal(8, 2)");

                entity.HasOne(d => d.StockCodeNavigation)
                    .WithMany(p => p.StockDays)
                    .HasForeignKey(d => d.StockCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_stockDay_stock");

                entity.HasIndex("Date");
            });

            modelBuilder.Entity<StockFundamental>(entity =>
            {
                entity.HasKey(e => new { e.StockCode, e.Date });

                entity.ToTable("StockFundamental");

                entity.Property(e => e.StockCode)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.PERatio).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.PriceNetRatio).HasColumnType("decimal(5, 2)");

                entity.Property(e => e.ReportYearQuarter)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.StockName).HasMaxLength(50);

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.Property(e => e.YieldRate).HasColumnType("decimal(5, 2)");

                entity.HasIndex("Date");
            });

            modelBuilder.Entity<StockFunder>(entity =>
            {
                entity.HasKey(e => new { e.StockCode, e.Date });

                entity.ToTable("StockFunder");

                entity.Property(e => e.StockCode)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Date).HasColumnType("date");

                entity.HasIndex("Date");
                entity.HasIndex(x => x.CreditSum).IncludeProperties(x => new
                {
                    x.ForeignBuy,
                    x.ForeignSell,
                    x.ForeignSum,
                    x.ForeignSelfBuy,
                    x.ForeignSelfSell,
                    x.ForeignSelfSum,
                    x.CreditBuy,
                    x.CreditSell,
                    x.SelfBuySell,
                    x.SelfBuy,
                    x.SelfSell,
                    x.SelfSum,
                    x.SelfHedgingBuy,
                    x.SelfHedgingSell,
                    x.SelfHedgingSum,
                    x.Total
                });
            });

            modelBuilder.Entity<StockMargin>(entity =>
            {
                entity.HasKey(e => new { e.StockCode, e.Date });

                entity.ToTable("StockMargin");

                entity.Property(e => e.StockCode)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Remark)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Date).HasColumnType("date");

                entity.HasIndex("Date");

            });

            modelBuilder.Entity<StockRevenue>(entity =>
            {
                entity.HasKey(e => new { e.StockCode, e.Date });

                entity.ToTable("StockRevenue");

                entity.Property(e => e.StockCode)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.CurrentMonth).HasColumnType("decimal(18, 2)");
                entity.Property(e => e.MoM).HasColumnType("decimal(18, 2)");
                entity.Property(e => e.PreMonth).HasColumnType("decimal(18, 2)");
                entity.Property(e => e.PreYearMonth).HasColumnType("decimal(18, 2)");
                entity.Property(e => e.PreYearTotal).HasColumnType("decimal(18, 2)");
                entity.Property(e => e.TotalYoY).HasColumnType("decimal(18, 2)");
                entity.Property(e => e.YoY).HasColumnType("decimal(18, 2)");
                entity.Property(e => e.YearTotal).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.Remarks)
                    .HasMaxLength(100);

                entity.Property(e => e.Date).HasColumnType("date");

                entity.HasIndex("Date");
            });

            modelBuilder.Entity<StockGroup>(entity =>
            {
                entity.ToTable("StockGroup");

                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");

                entity.Property(e => e.GroupTitle).HasMaxLength(50);
            });

            modelBuilder.Entity<StockGroupItem>(entity =>
            {
                entity.ToTable("StockGroupItem");

                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");

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

                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");

                entity.Property(e => e.Contents).HasMaxLength(500);

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.StockCode)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .HasMaxLength(50);

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.HasOne(d => d.StockCodeNavigation)
                    .WithMany(p => p.StockNotes)
                    .HasForeignKey(d => d.StockCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_stock_note_stock");
            });

            modelBuilder.Entity<StockProfit>(entity =>
            {
                entity.HasKey(e => new { e.StockCode, e.Date });

                entity.ToTable("StockProfit");

                entity.Property(e => e.StockCode)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Revenue).HasColumnType("decimal(18, 2)");
                entity.Property(e => e.Gross).HasColumnType("decimal(18, 2)");
                entity.Property(e => e.NetProfit).HasColumnType("decimal(18, 2)");
                entity.Property(e => e.OperatingProfit).HasColumnType("decimal(18, 2)");
                entity.Property(e => e.UntaxedNetProfit).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.Date).HasColumnType("date");

                entity.HasIndex("Date");
            });

            modelBuilder.Entity<StockSeminar>(entity =>
            {
                entity.HasKey(e => new { e.StockCode, e.Date });

                entity.ToTable("StockSeminar");

                entity.Property(e => e.StockCode)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Date).HasColumnType("datetime");
                entity.Property(e => e.Place).HasMaxLength(200);
                entity.Property(e => e.Message).HasMaxLength(500);
                entity.Property(e => e.FileZh).HasMaxLength(500);
                entity.Property(e => e.FileEn).HasMaxLength(500);
                entity.Property(e => e.Web).HasMaxLength(500);
                entity.Property(e => e.Video).HasMaxLength(500);
                entity.Property(e => e.Remark).HasMaxLength(500);

                entity.HasIndex("Date");
            });

            modelBuilder.Entity<StockNew>(entity =>
            {
                entity.HasKey(e => new { e.Id });

                entity.ToTable("StockNews");

                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");
                entity.Property(e => e.StockCode)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Title).HasMaxLength(500);
                entity.Property(e => e.Content).HasMaxLength(5000);
                entity.Property(e => e.Provider).HasMaxLength(20);

                entity.HasIndex("Time");
                entity.HasIndex("StockCode");
            });

            modelBuilder.Entity<StockInsiderTransaction>(entity =>
            {
                entity.HasKey(e => new { e.Id });

                entity.ToTable("StockInsiderTransaction");

                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");
                entity.Property(e => e.StockCode)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.FromName).HasMaxLength(50);
                entity.Property(e => e.ToName).HasMaxLength(50);
                entity.Property(e => e.Position).HasMaxLength(20);
                entity.Property(e => e.Method).HasMaxLength(20);
                entity.Property(e => e.During).HasMaxLength(50);

                entity.HasIndex("Time");
                entity.HasIndex("StockCode");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}