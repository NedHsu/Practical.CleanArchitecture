using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClassifiedAds.Migrator.MinsDream.Migrations.StockDb
{
    public partial class _2022061623 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Stock",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: false),
                    Ex = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    ClosePrice = table.Column<decimal>(type: "decimal(8,2)", nullable: true),
                    FivePrice = table.Column<decimal>(type: "decimal(8,2)", nullable: true),
                    TenPrice = table.Column<decimal>(type: "decimal(8,2)", nullable: true),
                    TwentyPrice = table.Column<decimal>(type: "decimal(8,2)", nullable: true),
                    SixtyPrice = table.Column<decimal>(type: "decimal(8,2)", nullable: true),
                    FetchDate = table.Column<DateTime>(type: "date", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ListingDate = table.Column<DateTime>(type: "date", nullable: true),
                    Industry = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    CFICode = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: true),
                    Note = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ISINCode = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_stock_1", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "StockEPS",
                columns: table => new
                {
                    StockCode = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Year = table.Column<int>(type: "int", nullable: false),
                    EPS = table.Column<decimal>(type: "decimal(5,2)", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockEPS", x => new { x.StockCode, x.Year });
                });

            migrationBuilder.CreateTable(
                name: "StockFundamental",
                columns: table => new
                {
                    StockCode = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: false),
                    Date = table.Column<DateTime>(type: "date", nullable: false),
                    StockName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    YieldRate = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    DividendYear = table.Column<int>(type: "int", nullable: true),
                    PERatio = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    PriceNetRatio = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    ReportYearQuarter = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: true),
                    Created = table.Column<DateTime>(type: "datetime", nullable: true),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockFundamental", x => new { x.StockCode, x.Date });
                });

            migrationBuilder.CreateTable(
                name: "StockFunder",
                columns: table => new
                {
                    StockCode = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: false),
                    Date = table.Column<DateTime>(type: "date", nullable: false),
                    ForeignBuy = table.Column<int>(type: "int", nullable: false),
                    ForeignSell = table.Column<int>(type: "int", nullable: false),
                    ForeignSum = table.Column<int>(type: "int", nullable: false),
                    ForeignSelfBuy = table.Column<int>(type: "int", nullable: false),
                    ForeignSelfSell = table.Column<int>(type: "int", nullable: false),
                    ForeignSelfSum = table.Column<int>(type: "int", nullable: false),
                    CreditBuy = table.Column<int>(type: "int", nullable: false),
                    CreditSell = table.Column<int>(type: "int", nullable: false),
                    CreditSum = table.Column<int>(type: "int", nullable: false),
                    SelfBuySell = table.Column<int>(type: "int", nullable: false),
                    SelfBuy = table.Column<int>(type: "int", nullable: false),
                    SelfSell = table.Column<int>(type: "int", nullable: false),
                    SelfSum = table.Column<int>(type: "int", nullable: false),
                    SelfHedgingBuy = table.Column<int>(type: "int", nullable: false),
                    SelfHedgingSell = table.Column<int>(type: "int", nullable: false),
                    SelfHedgingSum = table.Column<int>(type: "int", nullable: false),
                    Total = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockFunder", x => new { x.StockCode, x.Date });
                });

            migrationBuilder.CreateTable(
                name: "StockGroup",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "newsequentialid()"),
                    GroupTitle = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Sort = table.Column<int>(type: "int", nullable: true),
                    Creater = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockGroup", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StockMargin",
                columns: table => new
                {
                    StockCode = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: false),
                    Date = table.Column<DateTime>(type: "date", nullable: false),
                    FinancingBuy = table.Column<int>(type: "int", nullable: false),
                    FinancingSell = table.Column<int>(type: "int", nullable: false),
                    FinancingBack = table.Column<int>(type: "int", nullable: false),
                    FinancingBeforeBalance = table.Column<int>(type: "int", nullable: false),
                    FinancingBalance = table.Column<int>(type: "int", nullable: false),
                    FinancingLimit = table.Column<int>(type: "int", nullable: false),
                    SecuritiesBuy = table.Column<int>(type: "int", nullable: false),
                    SecuritiesSell = table.Column<int>(type: "int", nullable: false),
                    SecuritiesBack = table.Column<int>(type: "int", nullable: false),
                    SecuritiesBeforeBalance = table.Column<int>(type: "int", nullable: false),
                    SecuritiesBalance = table.Column<int>(type: "int", nullable: false),
                    SecuritiesLimit = table.Column<int>(type: "int", nullable: false),
                    Offset = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockMargin", x => new { x.StockCode, x.Date });
                });

            migrationBuilder.CreateTable(
                name: "StockSeminar",
                columns: table => new
                {
                    StockCode = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: false),
                    Date = table.Column<DateTime>(type: "datetime", nullable: false),
                    Place = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Message = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    FileZh = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    FileEn = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Web = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Video = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Remark = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockSeminar", x => new { x.StockCode, x.Date });
                });

            migrationBuilder.CreateTable(
                name: "StockDay",
                columns: table => new
                {
                    StockCode = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: false),
                    Date = table.Column<DateTime>(type: "date", nullable: false),
                    DealAmount = table.Column<long>(type: "bigint", nullable: true),
                    DealMoney = table.Column<long>(type: "bigint", nullable: true),
                    OpenPrice = table.Column<decimal>(type: "decimal(8,2)", nullable: true),
                    HighestPrice = table.Column<decimal>(type: "decimal(8,2)", nullable: true),
                    LowestPrice = table.Column<decimal>(type: "decimal(8,2)", nullable: true),
                    ClosePrice = table.Column<decimal>(type: "decimal(8,2)", nullable: true),
                    DealCount = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockDay", x => new { x.StockCode, x.Date });
                    table.ForeignKey(
                        name: "FK_stockDay_stock",
                        column: x => x.StockCode,
                        principalTable: "Stock",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "StockGroupItem",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "newsequentialid()"),
                    StockCode = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: false),
                    GroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Sort = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockGroupItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_stock_group_items_stock",
                        column: x => x.StockCode,
                        principalTable: "Stock",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "StockInsiderTransaction",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "newsequentialid()"),
                    StockCode = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: true),
                    Time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Position = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    FromName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ToName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Method = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    CreditBefore = table.Column<int>(type: "int", nullable: false),
                    CreditAfter = table.Column<int>(type: "int", nullable: false),
                    OwnBefore = table.Column<int>(type: "int", nullable: false),
                    OwnAfter = table.Column<int>(type: "int", nullable: false),
                    During = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    CreatedDateTime = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedDateTime = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockInsiderTransaction", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StockInsiderTransaction_Stock_StockCode",
                        column: x => x.StockCode,
                        principalTable: "Stock",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "StockNews",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "newsequentialid()"),
                    StockCode = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: true),
                    Time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Content = table.Column<string>(type: "nvarchar(max)", maxLength: 5000, nullable: true),
                    Provider = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    CreatedDateTime = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedDateTime = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockNews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StockNews_Stock_StockCode",
                        column: x => x.StockCode,
                        principalTable: "Stock",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "StockNote",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "newsequentialid()"),
                    StockCode = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Contents = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Created = table.Column<DateTime>(type: "datetime", nullable: true),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: true),
                    Creater = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockNote", x => x.Id);
                    table.ForeignKey(
                        name: "FK_stock_note_stock",
                        column: x => x.StockCode,
                        principalTable: "Stock",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "StockProfit",
                columns: table => new
                {
                    StockCode = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: false),
                    Date = table.Column<DateTime>(type: "date", nullable: false),
                    Revenue = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Gross = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    OperatingProfit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    UntaxedNetProfit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    NetProfit = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockProfit", x => new { x.StockCode, x.Date });
                    table.ForeignKey(
                        name: "FK_StockProfit_Stock_StockCode",
                        column: x => x.StockCode,
                        principalTable: "Stock",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StockRevenue",
                columns: table => new
                {
                    StockCode = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: false),
                    Date = table.Column<DateTime>(type: "date", nullable: false),
                    CurrentMonth = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PreMonth = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PreYearMonth = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MoM = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    YoY = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    YearTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PreYearTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalYoY = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockRevenue", x => new { x.StockCode, x.Date });
                    table.ForeignKey(
                        name: "FK_StockRevenue_Stock_StockCode",
                        column: x => x.StockCode,
                        principalTable: "Stock",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StockDay_Date",
                table: "StockDay",
                column: "Date");

            migrationBuilder.CreateIndex(
                name: "IX_StockFundamental_Date",
                table: "StockFundamental",
                column: "Date");

            migrationBuilder.CreateIndex(
                name: "IX_StockFunder_CreditSum",
                table: "StockFunder",
                column: "CreditSum")
                .Annotation("SqlServer:Include", new[] { "ForeignBuy", "ForeignSell", "ForeignSum", "ForeignSelfBuy", "ForeignSelfSell", "ForeignSelfSum", "CreditBuy", "CreditSell", "SelfBuySell", "SelfBuy", "SelfSell", "SelfSum", "SelfHedgingBuy", "SelfHedgingSell", "SelfHedgingSum", "Total" });

            migrationBuilder.CreateIndex(
                name: "IX_StockFunder_Date",
                table: "StockFunder",
                column: "Date");

            migrationBuilder.CreateIndex(
                name: "IX_StockGroupItem_StockCode",
                table: "StockGroupItem",
                column: "StockCode");

            migrationBuilder.CreateIndex(
                name: "IX_StockInsiderTransaction_StockCode",
                table: "StockInsiderTransaction",
                column: "StockCode");

            migrationBuilder.CreateIndex(
                name: "IX_StockInsiderTransaction_Time",
                table: "StockInsiderTransaction",
                column: "Time");

            migrationBuilder.CreateIndex(
                name: "IX_StockMargin_Date",
                table: "StockMargin",
                column: "Date");

            migrationBuilder.CreateIndex(
                name: "IX_StockNews_StockCode",
                table: "StockNews",
                column: "StockCode");

            migrationBuilder.CreateIndex(
                name: "IX_StockNews_Time",
                table: "StockNews",
                column: "Time");

            migrationBuilder.CreateIndex(
                name: "IX_StockNote_StockCode",
                table: "StockNote",
                column: "StockCode");

            migrationBuilder.CreateIndex(
                name: "IX_StockProfit_Date",
                table: "StockProfit",
                column: "Date");

            migrationBuilder.CreateIndex(
                name: "IX_StockRevenue_Date",
                table: "StockRevenue",
                column: "Date");

            migrationBuilder.CreateIndex(
                name: "IX_StockSeminar_Date",
                table: "StockSeminar",
                column: "Date");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StockDay");

            migrationBuilder.DropTable(
                name: "StockEPS");

            migrationBuilder.DropTable(
                name: "StockFundamental");

            migrationBuilder.DropTable(
                name: "StockFunder");

            migrationBuilder.DropTable(
                name: "StockGroup");

            migrationBuilder.DropTable(
                name: "StockGroupItem");

            migrationBuilder.DropTable(
                name: "StockInsiderTransaction");

            migrationBuilder.DropTable(
                name: "StockMargin");

            migrationBuilder.DropTable(
                name: "StockNews");

            migrationBuilder.DropTable(
                name: "StockNote");

            migrationBuilder.DropTable(
                name: "StockProfit");

            migrationBuilder.DropTable(
                name: "StockRevenue");

            migrationBuilder.DropTable(
                name: "StockSeminar");

            migrationBuilder.DropTable(
                name: "Stock");
        }
    }
}
