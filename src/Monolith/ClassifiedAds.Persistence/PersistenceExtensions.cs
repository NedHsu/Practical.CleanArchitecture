﻿using ClassifiedAds.Domain.Repositories;
using ClassifiedAds.Persistence;
using ClassifiedAds.Persistence.DapperContext;
using ClassifiedAds.Persistence.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class PersistenceExtensions
    {
        public static IServiceCollection AddPersistence(this IServiceCollection services, string connectionString, string migrationsAssembly = "")
        {
            services.AddDbContext<AdsDbContext>(options => options.UseSqlServer(connectionString, sql =>
            {
                if (!string.IsNullOrEmpty(migrationsAssembly))
                {
                    sql.MigrationsAssembly(migrationsAssembly);
                }
            }))
                    .AddScoped(typeof(IRepository<,>), typeof(Repository<,>))
                    .AddScoped(typeof(IAuditLogEntryRepository), typeof(AuditLogEntryRepository))
                    .AddScoped(typeof(IEmailMessageRepository), typeof(EmailMessageRepository))
                    .AddScoped(typeof(ISmsMessageRepository), typeof(SmsMessageRepository))
                    .AddScoped(typeof(IUserRepository), typeof(UserRepository))
                    .AddScoped(typeof(IRoleRepository), typeof(RoleRepository));

            services.AddDbContext<ClassifiedAds.Persistence.StockDbContext>(options => options.UseSqlServer(connectionString, sql =>
            {
                if (!string.IsNullOrEmpty(migrationsAssembly))
                {
                    sql.MigrationsAssembly(migrationsAssembly);
                }
            }))
                .AddScoped(typeof(IBaseDapperRepository<>), typeof(BaseDapperRepository<>))
                .AddScoped(typeof(IStockDayRepository), typeof(StockDayRepository))
                .AddScoped(typeof(IStockMarginRepository), typeof(StockMarginRepository))
                .AddScoped(typeof(IStockFunderRepository), typeof(StockFunderRepository))
                .AddScoped(typeof(IStockRevenueRepository), typeof(StockRevenueRepository))
                .AddScoped(typeof(IStockDapperRepository), typeof(StockDapperRepository));

            services.AddScoped<IStockDbContext>(_ => new ClassifiedAds.Persistence.DapperContext.StockDbContext(connectionString));

            return services;
        }

        public static void MigrateAdsDb(this IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                serviceScope.ServiceProvider.GetRequiredService<AdsDbContext>().Database.Migrate();
            }
        }
    }
}
