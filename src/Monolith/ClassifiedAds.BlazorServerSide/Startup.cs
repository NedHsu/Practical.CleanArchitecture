using System;
using System.Net.Http;
using Blazorise;
using Blazorise.Bootstrap;
using Blazorise.Icons.FontAwesome;
using ClassifiedAds.Blazor.Modules.AuditLogs.Services;
using ClassifiedAds.Blazor.Modules.Calendars.Services;
using ClassifiedAds.Blazor.Modules.Core.Services;
using ClassifiedAds.Blazor.Modules.Files.Services;
using ClassifiedAds.Blazor.Modules.Matchs.Services;
using ClassifiedAds.Blazor.Modules.Products.Services;
using ClassifiedAds.Blazor.Modules.Users.Services;
using ClassifiedAds.BlazorServerSide.ConfigurationOptions;
using ClassifiedAds.BlazorServerSide.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace ClassifiedAds.BlazorServerSide {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;

            AppSettings = new AppSettings();
            Configuration.Bind(AppSettings);
        }

        public IConfiguration Configuration { get; }

        private AppSettings AppSettings { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services) {
            services.Configure<AppSettings>(Configuration);
            services.AddSingleton(AppSettings);

            if (AppSettings.CookiePolicyOptions?.IsEnabled ?? false) {
                services.Configure<Microsoft.AspNetCore.Builder.CookiePolicyOptions>(options => {
                    // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                    options.CheckConsentNeeded = context => true;
                    options.MinimumSameSitePolicy = AppSettings.CookiePolicyOptions.MinimumSameSitePolicy;
                    options.Secure = AppSettings.CookiePolicyOptions.Secure;
                });
            }

            services
                .AddBlazorise(options => {
                    options.ChangeTextOnKeyPress = true; // optional
                })
                .AddBootstrapProviders()
                .AddFontAwesomeIcons();

            services.AddRazorPages();
            services.AddServerSideBlazor();
            if (AppSettings.Azure?.SignalR?.IsEnabled ?? false) {
                services.AddSignalR()
                    .AddAzureSignalR();
            }
            services.AddScoped<ITokenManager, TokenManager>();
            services.AddScoped<TokenProvider>();
            Action<HttpClient> configureClient = client => {
                client.BaseAddress = new Uri(AppSettings.ResourceServer.Endpoint);
                client.Timeout = new TimeSpan(0, 0, 30);
                client.DefaultRequestHeaders.Clear();
            };
            services.AddHttpClient<FileService, FileService>(configureClient);
            services.AddHttpClient<ProductService, ProductService>(configureClient);
            services.AddHttpClient<MatchService, MatchService>(configureClient);
            services.AddHttpClient<CalendarService, CalendarService>(configureClient);
            services.AddHttpClient<UserService, UserService>(configureClient);
            services.AddHttpClient<AuditLogService, AuditLogService>(configureClient);

            services.AddAuthentication(options => {
                    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
                })
                .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, options => {
                    options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.Authority = AppSettings.OpenIdConnect.Authority;
                    options.ClientId = AppSettings.OpenIdConnect.ClientId;
                    options.ClientSecret = AppSettings.OpenIdConnect.ClientSecret;
                    options.ResponseType = "code id_token";
                    options.Scope.Add("openid");
                    options.Scope.Add("profile");
                    options.Scope.Add("ClassifiedAds.WebAPI");
                    options.Scope.Add("offline_access");
                    options.SaveTokens = true;
                    options.GetClaimsFromUserInfoEndpoint = true;
                    options.TokenValidationParameters.NameClaimType = "name";
                    options.RequireHttpsMetadata = AppSettings.OpenIdConnect.RequireHttpsMetadata;
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            } else {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            if (AppSettings.CookiePolicyOptions?.IsEnabled ?? false) {
                app.UseCookiePolicy();
            }

            app.UseRouting();

            app.ApplicationServices
                .UseBootstrapProviders()
                .UseFontAwesomeIcons();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => {
                endpoints.MapBlazorHub();
                endpoints.MapFallbackToPage("/_Host");
            });
        }
    }
}