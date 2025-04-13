using System.Net;

namespace Application.Exceptions;

public class CustomHttpException : Exception
{
    public HttpStatusCode StatusCode { get; }
    
    public CustomHttpException(HttpStatusCode statusCode, string message) : base(message)
    {
        StatusCode = statusCode;
    }

    public CustomHttpException(HttpStatusCode statusCode, object error): base(error.ToString())
    {
        StatusCode = statusCode;
    }
}