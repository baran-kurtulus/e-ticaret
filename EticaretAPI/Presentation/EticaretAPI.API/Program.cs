using EticaretAPI.Application.Validators;
using EticaretAPI.Infrastructure.Filters;
using EticaretAPI.Persistence;
using FluentValidation.AspNetCore;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddPersistenceServices();// Burada Tetiklenmesi gerek Persistence'ta yazdığımız fonksiyonun
builder.Services.AddCors(options => options.AddDefaultPolicy(policy => 
    //policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin() //herkes girebilir şuan
    //Sadece burdan gelenleri al
    policy.WithOrigins("http://localhost:4200", "https://localhost:4200").AllowAnyHeader().AllowAnyMethod()
    ));//CORS politikalarını ayarlamamızı sağlar
// Add services to the container.

builder.Services.AddControllers(options => options.Filters.Add<ValidationFilter>())//kendi özel filterimizi verdik
    .AddFluentValidation(configuration => configuration.RegisterValidatorsFromAssemblyContaining<CreateProductValidator>()) //verilen sınıftaki validatorleri register eder
    .ConfigureApiBehaviorOptions(options => options.SuppressModelStateInvalidFilter = true);//FluentValidation ile birlikte default validasyonları devre dışı bırakırız

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
    

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseCors();// Burada çağırılması gerek

app.UseAuthorization();

app.MapControllers();

app.Run();