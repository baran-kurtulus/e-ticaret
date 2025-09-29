using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace EticaretAPI.Infrastructure.Filters;

public class ValidationFilter : IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        if (!context.ModelState.IsValid)// Kendi filterimizi oluşturduk
        {
            var errors = context.ModelState
                .Where(x => x.Value.Errors.Any())// Tüm errorleri aldık
                //e.Key propertyi getiricek diğer kısım da o property de alınan tüm errorler
                .ToDictionary(e => e.Key, e => e.Value.Errors.Select(x => x.ErrorMessage))
                .ToArray();

            context.Result = new BadRequestObjectResult(errors);
            return;
        }

         await next();
    }
}