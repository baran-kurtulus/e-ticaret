using System.Linq.Expressions;
using EticaretAPI.Application.Repostories;
using EticaretAPI.Domain.Entities;
using EticaretAPI.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace EticaretAPI.Persistence.Repostories;

// Zaten ReadRepository'de implementasyonlar yapılı olduğu için oradan kullanılacak constructorla değeri gödermek yeterli
public class OrderReadRepository : ReadRepository<Order>, IOrderReadRepository
{
    public OrderReadRepository(EticaretAPIDbContext context) : base(context)
    {
    }
}