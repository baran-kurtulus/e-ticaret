using System.Net;
using EticaretAPI.Application.Abstractions;
using EticaretAPI.Application.Repostories;
using EticaretAPI.Application.RequestParameters;
using EticaretAPI.Application.ViewModels.Products;
using EticaretAPI.Domain;
using EticaretAPI.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EticaretAPI.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    //private readonly IProductService _productService;// Referansı Çağırabildik
    //public ProductsController(IProductService productService)
    //{
    //    _productService = productService;
    //}
    
    //[HttpGet]
    //public IActionResult GetProducts()
    //{
    //    var products = _productService.GetProducts();
    //    return Ok(products);
    //}
    
    private readonly IProductWriteRepository _productWriteRepository;
    private readonly IProductReadRepository _productReadRepository;
    private readonly IWebHostEnvironment _webHostEnvironment; // wwwroot'a ulaşabilmek için bunu da ekledik
    
    // private readonly IOrderWriteRepository _orderWriteRepository;
    // private readonly IOrderReadRepository _orderReadRepository;
    //
    // private readonly ICustomerWriteRepository _customerWriteRepository;
    public ProductsController(IProductWriteRepository productWriteRepository, IProductReadRepository productReadRepository, IOrderWriteRepository orderWriteRepository, IOrderReadRepository orderReadRepository, ICustomerWriteRepository customerWriteRepository, IWebHostEnvironment webHostEnvironment)
    {
        _productWriteRepository = productWriteRepository;
        _productReadRepository = productReadRepository;
        _webHostEnvironment = webHostEnvironment;
        // _orderWriteRepository = orderWriteRepository;
        // _orderReadRepository = orderReadRepository;
        // _customerWriteRepository = customerWriteRepository;
    }

    [HttpPost]
    public async Task<IActionResult> Post(VM_Create_Product model)// Şu anda test amaçlı bu şekilde
    {
        if (ModelState.IsValid)
        {
            
        }
        await _productWriteRepository.AddAsync(new()//Şu anda test amaçlı böyle
        {
            Name = model.Name,
            Price = model.Price,
            Stock = model.Stock,
        });
        await _productWriteRepository.SaveAsync();
        return StatusCode((int)HttpStatusCode.Created);//201
    }

    [HttpPut]// Verilen id'deki değerleri şunlarla değiştir
    public async Task<IActionResult> Put(VM_Update_Product model)
    {
        Product product = await _productReadRepository.GetByIdAsync(model.Id);
        product.Name = model.Name;
        product.Price = model.Price;
        product.Stock = model.Stock;//veri Track edilmediğinde Update kullanılabilir yoksa zaten update yapar
        await _productWriteRepository.SaveAsync();
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        await _productWriteRepository.RemoveAsync(id);
        await _productWriteRepository.SaveAsync();
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery]Pagination pagination)
    {
        var totalCount = _productReadRepository.GetAll(false).Count(); 
        var products = _productReadRepository.GetAll(false).Skip(pagination.Page * pagination.Size).Take(pagination.Size).Select(p => new
        {
            p.Id,
            p.Name,
            p.Price,
            p.Stock,
            p.CreatedDate,
            p.UpdatedDate
        }).ToList() ;// take ile olunan sayfadaki verileri getirdik  skip  ile önceki sayfalardaki verileri atladık
        
        return Ok(new
        {
            totalCount,
            products
        });
        
        
        
        
        
        //await _productWriteRepository.AddRangeAsync(new()
        //{
        //    new() { Id = Guid.NewGuid(), Name = "Product 1", Price = 100, CreatedDate = DateTime.UtcNow, Stock = 10 },
        //    new() { Id = Guid.NewGuid(), Name = "Product 2", Price = 200, CreatedDate = DateTime.UtcNow, Stock = 20 },
        //    new() { Id = Guid.NewGuid(), Name = "Product 3", Price = 300, CreatedDate = DateTime.UtcNow, Stock = 30 },
        //});
        //await _productWriteRepository.SaveAsync();
        
        
        // Product p = await _productReadRepository.GetByIdAsync("8810619f-d517-4512-a985-6801d4ebef96", false);
        // p.Name = "esma";
        // _productWriteRepository.SaveAsync();

        // var customerId = Guid.NewGuid();
        // await _customerWriteRepository.AddAsync(new() { Id = customerId, Name = "Esma" });
        //
        // await _orderWriteRepository.AddAsync(new() { Description = "Esmaskim", Address = "Yıldırım/Bursa", CustomerId = customerId});
        // await _orderWriteRepository.AddAsync(new() { Description = "Esmaskim2", Address = "Nilüfer/Bursa", CustomerId = customerId});
        //
        // await _productWriteRepository.AddAsync(new() { Name = "Iphone 15", Stock = 100, Price = 51.200f });
        // await _productWriteRepository.AddAsync(new() { Name = "Iphone 16", Stock = 200, Price = 51.200f });
        // await _productWriteRepository.AddAsync(new() { Name = "Iphone 17", Stock = 300, Price = 51.200f });
        // await _productWriteRepository.AddAsync(new() { Name = "Iphone Air", Stock = 400, Price = 51.200f });
        // await _productWriteRepository.AddAsync(new() { Name = "Iphone 13", Stock = 500, Price = 51.200f });
        // await _orderWriteRepository.SaveAsync();// Herhangi birinde saveasync dememiz yeterli scoped olduğu için


        // Order order = await _orderReadRepository.GetByIdAsync("019934dc-21ef-7bad-9631-8e5e28e2daea");
        // order.Address = "Sarıyer/İstanbul";
        // await _orderWriteRepository.SaveAsync();

        // var products = await  _productReadRepository.GetAll().ToListAsync(); //Dışarı dönerken list yapmak lazım!!!
        // return products;
        
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(string id)
    {
        return Ok(await _productReadRepository.GetByIdAsync(id, false));
    }
    
    [HttpPost("[action]")] // [action] route'ta metodun adını da ekler yanı burası products/Upload oldu
    public async Task<IActionResult> Upload()
    {
        // wwwroot/resource/product-images klasörü anlamına geliyor
        string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "resource/product-images");

        if (!Directory.Exists(uploadPath))
        {
            Directory.CreateDirectory(uploadPath);
        }
        
        Random r = new Random();
        foreach (IFormFile file in Request.Form.Files)//Request.Form.Files ile gelen dosyayı yakaladık
        {
            string fullPath = Path.Combine(uploadPath, $"{r.Next()}{Path.GetExtension(file.Name)}");//şu anlık verileri rastgele double değerlerle kaydediyoruz get extension ile uzantısını aldık
            using FileStream filestream = new(fullPath, FileMode.Create, FileAccess.Write, FileShare.None, 1024 * 1024, useAsync:false);
            await file.CopyToAsync(filestream);
            await filestream.FlushAsync();
        }
        return Ok(); 
    }
    
    
    
}