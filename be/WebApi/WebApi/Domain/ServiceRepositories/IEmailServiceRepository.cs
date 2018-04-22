namespace WebApi.Domain.ServiceRepositories
{
    public interface IEmailServiceRepository
    {
        void SendEmail(string email, string subject, string message);
    }
}