using System.Net;

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