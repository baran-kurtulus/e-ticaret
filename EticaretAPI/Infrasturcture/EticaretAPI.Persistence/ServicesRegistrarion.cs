using EticaretAPI.Application.Abstractions;
using EticaretAPI.Application.Repostories;
//using EticaretAPI.Persistence.Concretes;
using EticaretAPI.Persistence.Context;
using EticaretAPI.Persistence.Repostories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EticaretAPI.Persistence;

public static class ServicesRegistrarion
{
    public static void AddPersistenceServices(this IServiceCollection services)
    {
        //services.AddSingleton<IProductService, ProductService>();//Presentationdaki IOC containere persistence'ın referansını eklemek için
        

        //Burada hangi veritabanı kullanılacaksa onun paketi eklenmeli
        services.AddDbContext<EticaretAPIDbContext>(options => options.UseNpgsql(Configuration.ConnectionString), ServiceLifetime.Singleton);//Connection String dışardan aldık
        
        // Singleton: Her request ve inject için bir nesne oluşturulur ve o gönderilir
        // Scoped: Her request için ayrı bir nesne oluşturulur ve requestin tüm injectlerine o nesne gönderilir işi bitince dispose?
        // Transient: Her request ve her inject için ayrı nesne oluşturulur işi bitince dispose?
        
        //AddDbContex hangi type ise onunla ekleme yapmak mantıklı o yüzden singleton değil scoped yaptık
        services.AddScoped<ICustomerReadRepository, CustomerReadRepository>();
        services.AddScoped<ICustomerWriteRepository, CustomerWriteRepository>();
        services.AddScoped<IOrderReadRepository, OrderReadRepository>();
        services.AddScoped<IOrderWriteRepository, OrderWriteRepository>();
        services.AddScoped<IProductReadRepository, ProductReadRepository>();
        services.AddScoped<IProductWriteRepository, ProductWriteRepository>();
    }
}