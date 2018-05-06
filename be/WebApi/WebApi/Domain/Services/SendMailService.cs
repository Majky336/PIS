using System.Collections.Generic;
using System.Linq;
using System.Text;
using WebApi.Domain.ServiceRepositories;
using WebApi.Domain.Services.Interfaces;
using WebApi.Models.ViewModels;

namespace WebApi.Domain.Services
{
    public class SendMailService : ISendMailService
    {
        private readonly IEmailServiceRepository _emailServiceRepository;

        public SendMailService(IEmailServiceRepository emailServiceRepository)
        {
            _emailServiceRepository = emailServiceRepository;
        }

        public void SendEmail(string email, string password)
        {
            const string subject = "Vaše heslo";

            var stringBuilder = new StringBuilder();
            stringBuilder.AppendLine("Dobnrý deň,");
            stringBuilder.AppendLine($"Vaše heslo je {password}");

            stringBuilder.AppendLine("");
            stringBuilder.AppendLine("S pozdravom,");
            stringBuilder.AppendLine("Vaša knižnica");

            _emailServiceRepository.SendEmail(email, subject, stringBuilder.ToString());
        }


        public void SendEmail(string email, List<ErrorForSaveViewModel> errors)
        {
            const string subject = "Nahlásené chyby";

            var stringBuilder = new StringBuilder();
            stringBuilder.AppendLine("Dobrý deň");
            stringBuilder.AppendLine($"Navrhli ste {errors.Count} chýb.");

            var messages = errors
                .Select(er => $"Starý údaj: {er.OldValue}, nový údaj: {er.NewValue}, názov údaju: {er.PropertyName}").ToList();

            messages.ForEach(message => stringBuilder.AppendLine(message));

            stringBuilder.AppendLine("");
            stringBuilder.AppendLine("S pozdravom,");
            stringBuilder.AppendLine("Vaša knižnica");

            _emailServiceRepository.SendEmail(email, subject, stringBuilder.ToString());
        }
    }
}