using System.Net;
using FluentValidation;

namespace Application.Exceptions;

public class HandleException : Exception
{
    public static (int StatusCode, object Body) Handle(Exception ex)
    {
        if (ex is CustomHttpException customEx)
        {
            return (
                (int)customEx.StatusCode,
                new
                {
                    statusCode = customEx.StatusCode,
                    message = customEx.Message,
                }
            );
        }
        
        if (ex is ValidationException validationEx)
        {
            var errors = validationEx.Errors
                .GroupBy(e => e.PropertyName)
                .ToDictionary(
                    g => g.Key,
                    g => g.Select(e => e.ErrorMessage).ToArray()
                );
            
            return (
                (int)HttpStatusCode.BadRequest,
                new
                {
                    statusCode = HttpStatusCode.BadRequest,
                    message = "Validation failed",
                    errors
                }
            );
        }

        return (
            (int)HttpStatusCode.InternalServerError, 
            new
            {
                statusCode = HttpStatusCode.InternalServerError,
                message = ex.Message
            }
        );
    }
}