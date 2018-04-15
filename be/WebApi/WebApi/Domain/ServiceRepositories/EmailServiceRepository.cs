using WebApi.EmailService;

namespace WebApi.Domain.ServiceRepositories
{
    public class EmailServiceRepository
    {
        public void SendEmail(string email, string heslo)
        {
            var service = new EmailPortTypeClient();

            var message = $"Vaše nové heslo je {email}";

            service.notify("024", "FYmoj1", email, "Nové heslo", message);

            service.Close();
        }
    }
}