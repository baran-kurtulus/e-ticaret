using System.Linq.Expressions;
using EticaretAPI.Domain.Entities.Common;

namespace EticaretAPI.Application.Repostories;

public interface IReadRepository<T> : IRepository<T> where T: BaseEntity
{
    // Read = SELECT
    IQueryable<T> GetAll(bool tracking = true);// Sorgu olarak yazacağımız için IQueryable in memory de IEnumerable kullanılır
    IQueryable<T> GetWhere(Expression<Func<T, bool>> method, bool tracking = true);// Bu özel tanımlı fonksiyonda verilen şart ifadesi doğru olanları getiricek
    Task<T> GetSingleAsync(Expression<Func<T, bool>> method, bool tracking = true); // Şarta uygun olan ilkini getiricek
    Task<T> GetByIdAsync(string id, bool tracking = true);
}