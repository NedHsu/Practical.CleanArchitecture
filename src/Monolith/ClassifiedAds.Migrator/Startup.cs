﻿using ClassifiedAds.Infrastructure.HealthChecks;
using ClassifiedAds.Persistence.MiniProfiler;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace ClassifiedAds.Migrator
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            if (string.Equals(Configuration["CheckDependency:Enabled"], "true", System.StringComparison.OrdinalIgnoreCase))
            {
                NetworkPortCheck.Wait(Configuration["CheckDependency:Host"], 5);
            }

            services.AddDateTimeProvider();

            services.AddPersistence(Configuration["ConnectionStrings:ClassifiedAds"],
                typeof(Startup).GetTypeInfo().Assembly.GetName().Name);

            services.AddIdentityServer()
                .AddIdServerPersistence(Configuration.GetConnectionString("ClassifiedAds"),
                typeof(Startup).GetTypeInfo().Assembly.GetName().Name);

            services.AddDbContext<MiniProfilerDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("ClassifiedAds"), sql =>
            {
                sql.MigrationsAssembly(typeof(Startup).GetTypeInfo().Assembly.GetName().Name);
            }));

            services.AddDbContext<Persistence.StockDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("ClassifiedAds"), sql =>
            {
                sql.MigrationsAssembly(typeof(Startup).GetTypeInfo().Assembly.GetName().Name);
            }));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.MigrateAdsDb();
            app.MigrateIdServerDb();
            app.MigrateMiniProfilerDb();
        }
    }
}
