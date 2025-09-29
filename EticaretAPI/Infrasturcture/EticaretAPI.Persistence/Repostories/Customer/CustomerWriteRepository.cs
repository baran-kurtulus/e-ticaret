using EticaretAPI.Application.Repostories;
using EticaretAPI.Domain.Entities;
using EticaretAPI.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace EticaretAPI.Persistence.Repostories;

// Zaten WriteRepository'de implementasyonlar yapılı olduğu için oradan kullanılacak constructorla değeri gödermek yeterli
public class CustomerWriteRepository: WriteRepository<Customer>, ICustomerWriteRepository
{
    public CustomerWriteRepository(EticaretAPIDbContext context) : base(context)
    {
        
    }
}