using EticaretAPI.Domain;

namespace EticaretAPI.Application.Abstractions;

public interface IProductService
{
    List<Product> GetProducts();
}