using EticaretAPI.Domain.Entities.Common;

namespace EticaretAPI.Domain.Entities;

public class Order : BaseEntity
{
    public Guid CustomerId { get; set; }// Entity framework bunu yazmazsak da otomatik oluşturur
    public string Description { get; set; }
    public string Address { get; set; }
    
    public ICollection<Product> Products { get; set; }// Çoktan bir olana koleksiyon referansı verilir
    public Customer Customer { get; set; }
}