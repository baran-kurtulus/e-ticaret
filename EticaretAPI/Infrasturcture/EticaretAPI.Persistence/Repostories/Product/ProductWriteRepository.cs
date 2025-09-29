using EticaretAPI.Application.Repostories;
using EticaretAPI.Domain;
using EticaretAPI.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace EticaretAPI.Persistence.Repostories;

// Zaten WriteRepository'de implementasyonlar yapılı olduğu için oradan kullanılacak constructorla değeri gödermek yeterli
public class ProductWriteRepository: WriteRepository<Product>, IProductWriteRepository
{
    public ProductWriteRepository(EticaretAPIDbContext context) : base(context)
    {
    }
}