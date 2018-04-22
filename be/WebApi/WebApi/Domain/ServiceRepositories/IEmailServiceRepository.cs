using WebApi.ChybaWsdlService;

namespace WebApi.Domain.ServiceRepositories
{
    public interface IEmailServiceRepository
    {
        void SendEmail(string email, Chybas[] errors);
        void SendEmail(string email, string heslo);
    }
}