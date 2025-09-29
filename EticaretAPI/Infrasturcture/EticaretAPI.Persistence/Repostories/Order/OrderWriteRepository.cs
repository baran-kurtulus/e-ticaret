using EticaretAPI.Application.Repostories;
using EticaretAPI.Domain.Entities;
using EticaretAPI.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace EticaretAPI.Persistence.Repostories;

// Zaten WriteRepository'de implementasyonlar yapılı olduğu için oradan kullanılacak constructorla değeri gödermek yeterli
public class OrderWriteRepository: WriteRepository<Order>, IOrderWriteRepository
{
    public OrderWriteRepository(EticaretAPIDbContext context) : base(context)
    {
    }
}