using System;
using System.Data;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using Microsoft.AspNetCore.DataProtection.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace ClassifiedAds.Persistence {
    public partial class StockDbContext : DbContext, IUnitOfWork, IDataProtectionKeyContext {
        public StockDbContext() { }

        public StockDbContext(DbContextOptions<StockDbContext> options) : base(options) { }

        public virtual DbSet<Stock> Stocks { get; set; }
        public virtual DbSet<StockDay> StockDays { get; set; }
        public virtual DbSet<StockFundamental> StockFundamentals { get; set; }
        public virtual DbSet<StockFunder> StockFunders { get; set; }

        public DbSet<DataProtectionKey> DataProtectionKeys { get; set; }

        public void BeginTransaction(IsolationLevel isolationLevel = IsolationLevel.ReadCommitted) {
            throw new NotImplementedException();
        }

        public void CommitTransaction() {
            throw new NotImplementedException();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Stock>(entity => {
                entity.HasKey(e => e.Code)
                    .HasName("PK_stock_1");

                entity.ToTable("stock");

                entity.Property(e => e.Code)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("code");

                entity.Property(e => e.Cficode)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("CFICode");

                entity.Property(e => e.ClosePrice)
                    .HasColumnType("decimal(8, 2)")
                    .HasColumnName("close_price");

                entity.Property(e => e.Ex)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ex");

                entity.Property(e => e.FetchDate)
                    .HasColumnType("date")
                    .HasColumnName("fetchDate");

                entity.Property(e => e.FivePrice)
                    .HasColumnType("decimal(8, 2)")
                    .HasColumnName("five_price");

                entity.Property(e => e.Industry)
                    .HasMaxLength(10)
                    .HasColumnName("industry");

                entity.Property(e => e.Isincode)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("ISINCode");

                entity.Property(e => e.ListingDate)
                    .HasColumnType("date")
                    .HasColumnName("listing_date");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .HasColumnName("name");

                entity.Property(e => e.Note)
                    .HasMaxLength(100)
                    .HasColumnName("note");

                entity.Property(e => e.SixtyPrice)
                    .HasColumnType("decimal(8, 2)")
                    .HasColumnName("sixty_price");

                entity.Property(e => e.TenPrice)
                    .HasColumnType("decimal(8, 2)")
                    .HasColumnName("ten_price");

                entity.Property(e => e.TwentyPrice)
                    .HasColumnType("decimal(8, 2)")
                    .HasColumnName("twenty_price");
            });

            modelBuilder.Entity<StockDay>(entity => {
                entity.HasKey(e => new { e.StockCode, e.Date });

                entity.ToTable("stockDay");

                entity.Property(e => e.StockCode)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("stock_code");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("date");

                entity.Property(e => e.ClosePrice)
                    .HasColumnType("decimal(8, 2)")
                    .HasColumnName("close_price");

                entity.Property(e => e.DealAmount).HasColumnName("deal_amount");

                entity.Property(e => e.DealCount).HasColumnName("deal_count");

                entity.Property(e => e.DealMoney).HasColumnName("deal_money");

                entity.Property(e => e.HighestPrice)
                    .HasColumnType("decimal(8, 2)")
                    .HasColumnName("highest_price");

                entity.Property(e => e.LowestPrice)
                    .HasColumnType("decimal(8, 2)")
                    .HasColumnName("lowest_price");

                entity.Property(e => e.OpenPrice)
                    .HasColumnType("decimal(8, 2)")
                    .HasColumnName("open_price");

                entity.HasOne(d => d.StockCodeNavigation)
                    .WithMany(p => p.StockDays)
                    .HasForeignKey(d => d.StockCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_stockDay_stock");
            });

            modelBuilder.Entity<StockFundamental>(entity => {
                entity.HasKey(e => new { e.StockCode, e.Date });

                entity.ToTable("stock_fundamental");

                entity.Property(e => e.StockCode)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("stock_code");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("date");

                entity.Property(e => e.Created)
                    .HasColumnType("datetime")
                    .HasColumnName("created");

                entity.Property(e => e.DividendYear).HasColumnName("dividend_year");

                entity.Property(e => e.PeRatio)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("pe_ratio");

                entity.Property(e => e.PriceNetRatio)
                    .HasColumnType("decimal(5, 2)")
                    .HasColumnName("price_net_ratio");

                entity.Property(e => e.ReportYearQuarter)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("report_year_quarter");

                entity.Property(e => e.StockName)
                    .HasMaxLength(50)
                    .HasColumnName("stock_name");

                entity.Property(e => e.Updated)
                    .HasColumnType("datetime")
                    .HasColumnName("updated");

                entity.Property(e => e.YieldRate)
                    .HasColumnType("decimal(5, 2)")
                    .HasColumnName("yield_rate");
            });

            modelBuilder.Entity<StockFunder>(entity => {
                entity.HasKey(e => new { e.StockCode, e.Date });

                entity.ToTable("stock_funder");

                entity.Property(e => e.StockCode)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("stock_code");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("date");

                entity.Property(e => e.CreditBuy).HasColumnName("credit_buy");

                entity.Property(e => e.CreditSell).HasColumnName("credit_sell");

                entity.Property(e => e.CreditSum).HasColumnName("credit_sum");

                entity.Property(e => e.ForeignBuy).HasColumnName("foreign_buy");

                entity.Property(e => e.ForeignSelfBuy).HasColumnName("foreign_self_buy");

                entity.Property(e => e.ForeignSelfSell).HasColumnName("foreign_self_sell");

                entity.Property(e => e.ForeignSelfSum).HasColumnName("foreign_self_sum");

                entity.Property(e => e.ForeignSell).HasColumnName("foreign_sell");

                entity.Property(e => e.ForeignSum).HasColumnName("foreign_sum");

                entity.Property(e => e.SelfBuy).HasColumnName("self_buy");

                entity.Property(e => e.SelfBuySell).HasColumnName("self_buy_sell");

                entity.Property(e => e.SelfHedgingBuy).HasColumnName("self_hedging_buy");

                entity.Property(e => e.SelfHedgingSell).HasColumnName("self_hedging_sell");

                entity.Property(e => e.SelfHedgingSum).HasColumnName("self_hedging_sum");

                entity.Property(e => e.SelfSell).HasColumnName("self_sell");

                entity.Property(e => e.SelfSum).HasColumnName("self_sum");

                entity.Property(e => e.Total).HasColumnName("total");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}