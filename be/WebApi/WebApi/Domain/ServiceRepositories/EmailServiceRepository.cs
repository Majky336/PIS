using WebApi.EmailWsdlService;

namespace WebApi.Domain.ServiceRepositories
{
    public class EmailServiceRepository : IEmailServiceRepository
    {
        public void SendEmail(string email, string subject, string message)
        {
            var service = new EmailPortTypeClient();

            service.notify("024", "FYmoj1", email, subject, message);

            service.Close();
        }
    }
}