using EticaretAPI.Domain.Entities;
using EticaretAPI.Domain.Entities.Common;

namespace EticaretAPI.Domain;

public class Product : BaseEntity
{
    public string Name { get; set; }
    public int Stock { get; set; }
    public float Price { get; set; }
    
    public ICollection<Order> Orders { get; set; }// Çoktan bir olana koleksiyon referansı verilir
    
}