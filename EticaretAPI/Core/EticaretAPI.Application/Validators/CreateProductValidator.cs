using EticaretAPI.Application.ViewModels.Products;
using FluentValidation;


namespace EticaretAPI.Application.Validators;

public class CreateProductValidator: AbstractValidator<VM_Create_Product>//FluentValidation nugetten indir
{
    public CreateProductValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .NotNull()
                .WithMessage("Name is required")
            .MaximumLength(50)
            .MinimumLength(3)
                .WithMessage("At least 3 characters of maximum 50 characters.");
            
        
        RuleFor(x => x.Stock)
            .NotNull()
            .NotEmpty()
                .WithMessage("Stock is required")
            .GreaterThanOrEqualTo(0)
                .WithMessage("Stock must be greater than or equal to 0");
        
        RuleFor(x => x.Price)
            .NotNull()
            .NotEmpty()
                .WithMessage("Price is required")
            .GreaterThanOrEqualTo(0)
                .WithMessage("Price must be greater than or equal to 0");
            
    }
}