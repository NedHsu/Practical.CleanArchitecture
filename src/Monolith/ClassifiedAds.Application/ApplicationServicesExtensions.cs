using ClassifiedAds.Application;
using ClassifiedAds.Application.EmailMessages.Services;
using ClassifiedAds.Application.Matchs.Services;
using ClassifiedAds.Application.Products.Services;
using ClassifiedAds.Application.Services;
using ClassifiedAds.Application.SmsMessages.Services;
using ClassifiedAds.Application.StockGroupItems.Services;
using ClassifiedAds.Application.Stocks.Services;
using ClassifiedAds.Application.Users.Services;
using ClassifiedAds.Application.Weathers.Services;
using ClassifiedAds.Domain.Events;
using System;
using System.Reflection;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, Action<Type, Type, ServiceLifetime> configureInterceptor = null)
        {
            DomainEvents.RegisterHandlers(Assembly.GetExecutingAssembly(), services);

            services
                .AddSingleton<IDomainEvents, DomainEvents>()
                .AddScoped(typeof(ICrudService<>), typeof(CrudService<>))
                .AddScoped(typeof(IDapperCrudService<>), typeof(DapperCrudService<>))
                .AddScoped<IUserService, UserService>()
                .AddScoped<IProductService, ProductService>()
                .AddScoped<IMatchService, MatchService>()
                .AddScoped<IStockService, StockService>()
                .AddScoped<IWeatherService, WeatherService>()
                .AddScoped<IStockGroupItemService, StockGroupItemService>()
                .AddScoped<EmailMessageService>()
                .AddScoped<SmsMessageService>()

                //--AddScoped
                .AddScoped<IOrderService, OrderService>()
                .AddScoped<IWordCustomService, WordCustomService>()
                .AddScoped<IWordStatsService, WordStatsService>()
                .AddScoped<IWordService, WordService>()
                .AddScoped<IQuestionService, QuestionService>()
                .AddScoped<IStockEpService, StockEpService>()
                .AddScoped<IJobSrcService, JobSrcService>()
                .AddScoped<IJobService, JobService>()
                .AddScoped<IStockNewService, StockNewService>()
                .AddScoped<ICalendarCategoryService, CalendarCategoryService>()
                .AddScoped<ICalendarService, CalendarService>()
                ;
            if (configureInterceptor != null)
            {
                var aggregateRootTypes = typeof(AggregateRoot<>).Assembly.GetTypes().Where(x => x.BaseType == typeof(AggregateRoot<Guid>)).ToList();
                foreach (var type in aggregateRootTypes)
                {
                    configureInterceptor(typeof(ICrudService<>).MakeGenericType(type), typeof(CrudService<>).MakeGenericType(type), ServiceLifetime.Scoped);
                }

                configureInterceptor(typeof(IUserService), typeof(UserService), ServiceLifetime.Scoped);
                configureInterceptor(typeof(IProductService), typeof(ProductService), ServiceLifetime.Scoped);
                configureInterceptor(typeof(IMatchService), typeof(MatchService), ServiceLifetime.Scoped);
                configureInterceptor(typeof(IStockService), typeof(StockService), ServiceLifetime.Scoped);

                //--configureInterceptor
                configureInterceptor(typeof(IOrderService), typeof(OrderService), ServiceLifetime.Scoped);
                configureInterceptor(typeof(IWordCustomService), typeof(WordCustomService), ServiceLifetime.Scoped);
                configureInterceptor(typeof(IWordStatsService), typeof(WordStatsService), ServiceLifetime.Scoped);
                configureInterceptor(typeof(IWordService), typeof(WordService), ServiceLifetime.Scoped);
                configureInterceptor(typeof(IQuestionService), typeof(QuestionService), ServiceLifetime.Scoped);
                configureInterceptor(typeof(IStockEpService), typeof(StockEpService), ServiceLifetime.Scoped);
                configureInterceptor(typeof(IJobSrcService), typeof(JobSrcService), ServiceLifetime.Scoped);
                configureInterceptor(typeof(IJobService), typeof(JobService), ServiceLifetime.Scoped);
                configureInterceptor(typeof(IStockNewService), typeof(StockNewService), ServiceLifetime.Scoped);
                configureInterceptor(typeof(ICalendarCategoryService), typeof(CalendarCategoryService), ServiceLifetime.Scoped);
                configureInterceptor(typeof(ICalendarService), typeof(CalendarService), ServiceLifetime.Scoped);
            }

            return services;
        }

        public static IServiceCollection AddMessageHandlers(this IServiceCollection services)
        {
            services.AddScoped<Dispatcher>();

            var assemblyTypes = Assembly.GetExecutingAssembly().GetTypes();

            foreach (var type in assemblyTypes)
            {
                var handlerInterfaces = type.GetInterfaces()
                   .Where(Utils.IsHandlerInterface)
                   .ToList();

                if (!handlerInterfaces.Any())
                {
                    continue;
                }

                var handlerFactory = new HandlerFactory(type);
                foreach (var interfaceType in handlerInterfaces)
                {
                    services.AddTransient(interfaceType, provider => handlerFactory.Create(provider, interfaceType));
                }
            }

            var aggregateRootTypes = typeof(AggregateRoot<>).Assembly.GetTypes().Where(x => x.BaseType == typeof(AggregateRoot<Guid>)).ToList();

            var genericHandlerTypes = new[]
            {
                typeof(GetEntititesQueryHandler<>),
                typeof(GetEntityByIdQueryHandler<>),
                typeof(AddOrUpdateEntityCommandHandler<>),
                typeof(DeleteEntityCommandHandler<>),
                typeof(CUDEntititesCommandHandler<>),
            };

            foreach (var aggregateRootType in aggregateRootTypes)
            {
                foreach (var genericHandlerType in genericHandlerTypes)
                {
                    var handlerType = genericHandlerType.MakeGenericType(aggregateRootType);
                    var handlerInterfaces = handlerType.GetInterfaces();

                    var handlerFactory = new HandlerFactory(handlerType);
                    foreach (var interfaceType in handlerInterfaces)
                    {
                        services.AddTransient(interfaceType, provider => handlerFactory.Create(provider, interfaceType));
                    }
                }
            }

            return services;
        }
    }
}
