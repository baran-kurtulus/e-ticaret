using System.Linq.Expressions;
using EticaretAPI.Application.Repostories;
using EticaretAPI.Domain;
using EticaretAPI.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace EticaretAPI.Persistence.Repostories;

// Zaten ReadRepository'de implementasyonlar yapılı olduğu için oradan kullanılacak constructorla değeri gödermek yeterli
public class ProductReadRepository: ReadRepository<Product>, IProductReadRepository
{
    public ProductReadRepository(EticaretAPIDbContext context) : base(context)
    {
    }
}