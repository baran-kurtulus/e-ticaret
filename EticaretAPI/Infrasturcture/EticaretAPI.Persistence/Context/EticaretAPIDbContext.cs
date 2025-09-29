using EticaretAPI.Domain;
using EticaretAPI.Domain.Entities;
using EticaretAPI.Domain.Entities.Common;
using Microsoft.EntityFrameworkCore;

namespace EticaretAPI.Persistence.Context;

public class EticaretAPIDbContext : DbContext //DbContext için EntityFramework Core kurulmalı NuGetten
{
    // IOC containerden belirli ayarlarda gelmesini istediğimiz için bu şekilde constructor oluşturduk
    public EticaretAPIDbContext(DbContextOptions options) : base(options)
    { 
        // IOC container'da doldurulacak
    }
    
    public DbSet<Product> Products { get; set; } //Product classı ile veritabanında aynı tanımda bir tablo olacağını söyledik
    public DbSet<Order> Orders { get; set; } //Order classı ile veritabanında aynı tanımda bir tablo olacağını söyledik
    public DbSet<Customer> Customers { get; set; } //Customer classı ile veritabanında aynı tanımda bir tablo olacağını söyledik

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken()) //interceptor
    {
        //ChangeTracker: Entityler üzerinden yapılan değişikliklerin ya da yeni eklenen verinin yakalanmasını sağlayan property
        //Update operasyonlarında track edilen verileri yakalayıp elde etmemizi sağlar

        var datas = ChangeTracker.Entries<BaseEntity>(); //update arasında gelen tüm verileri çektik

        foreach (var data in datas)
        {
            _ = data.State switch // _  discard demek geri dönülen değer gereksiz olduğunda kullanılabilir
            {
                EntityState.Added => data.Entity.CreatedDate = DateTime.UtcNow,
                EntityState.Modified => data.Entity.UpdatedDate = DateTime.UtcNow,
                _ => DateTime.UtcNow
            };
        }
            
        return await base.SaveChangesAsync(cancellationToken);
    }
}