using System.Linq.Expressions;
using EticaretAPI.Application.Repostories;
using EticaretAPI.Domain.Entities;
using EticaretAPI.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace EticaretAPI.Persistence.Repostories;

// Zaten ReadRepository'de implementasyonlar yapılı olduğu için oradan kullanılacak constructorla değeri gödermek yeterli
public class CustomerReadRepository: ReadRepository<Customer>, ICustomerReadRepository
{
    public CustomerReadRepository(EticaretAPIDbContext context) : base(context)
    {
        
    }
}