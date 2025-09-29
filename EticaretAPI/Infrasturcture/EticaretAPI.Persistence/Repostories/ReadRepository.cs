using System.Linq.Expressions;
using EticaretAPI.Application.Repostories;
using EticaretAPI.Domain.Entities.Common;
using EticaretAPI.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace EticaretAPI.Persistence.Repostories;

public class ReadRepository<T> : IReadRepository<T> where T: BaseEntity
{
    private readonly EticaretAPIDbContext _context; //IOC den gelecek

    public ReadRepository(EticaretAPIDbContext context)
    {
        _context = context;
    }
    
    public DbSet<T> Table => _context.Set<T>();
    
    // Boşu boşuna manipüle edilmeyecek verilerde tracking olup performansı düşürmesin diye tracking kapadık
    public IQueryable<T> GetAll(bool tracking = true)
        //=> Table; // tüm tabloyu dön
    {
        var query = Table.AsQueryable();
        if (!tracking)
            query = query.AsNoTracking();
        return query;
    }

    public IQueryable<T> GetWhere(Expression<Func<T, bool>> method, bool tracking = true)
        //=> Table.Where(method);// koşula göre dön
    {
        var query = Table.Where(method);
        if (!tracking)
            query = query.AsNoTracking();
        return query;
    }

    public async Task<T> GetSingleAsync(Expression<Func<T, bool>> method, bool tracking = true)
        //=> await Table.FirstOrDefaultAsync(method);// Sadece ilkini dön
    {
        var query = Table.AsQueryable();
        if (!tracking)
            query = Table.AsNoTracking();
        return await query.FirstOrDefaultAsync(method);
    }
    
    // Generic çalıştığımız için elimizde şuan id yok
    // Eğer tüm entity'ler bir class'tan veya interface'den geliyorsa o class veya interface'i verebilirsin generic yapıda
    // Projede tüm entity'ler BaseEntity'den türediği için where T: class yerine where T: BaseEntity denilebilir!!!
    public async Task<T> GetByIdAsync(string id, bool tracking = true)
        // => await Table.FirstOrDefaultAsync(data => data.Id == Guid.Parse(id));//bunun yerinde Find veya FindAsync kullanılabilir
        //=> await Table.FindAsync(Guid.Parse(id));
    {
        var query = Table.AsQueryable();
        if (!tracking)
            query = Table.AsNoTracking();
        return await query.FirstOrDefaultAsync(data => data.Id == Guid.Parse(id));
    }
}