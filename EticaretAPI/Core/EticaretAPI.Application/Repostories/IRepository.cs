using EticaretAPI.Domain.Entities.Common;
using Microsoft.EntityFrameworkCore;

namespace EticaretAPI.Application.Repostories;

public interface IRepository<T> where T: BaseEntity//Generic yapıyoruz ki sadece tek bir entity e özel olmasın
{
    DbSet<T> Table { get; }// Buradaki generic tür sadece class kabul ettiği için kısıt uyguladık
}