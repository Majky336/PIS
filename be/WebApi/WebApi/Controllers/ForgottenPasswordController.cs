using System;
using System.Web.Http;
using WebApi.Domain.ServiceRepositories;
using WebApi.Models.ViewModels;

namespace WebApi.Controllers
{
    public class ForgottenPasswordController : ApiController
    {
        protected virtual EmailServiceRepository ResolveEmailServiceRepository()
        {
            return new EmailServiceRepository();
        }

        public void ForgottenPassword(ForgottenPasswordViewModel forgottenPassword)
        {
            var random = new Random();

            var newPassword = string.Empty;

            for (var i = 0; i < 8; i++)
            {
                newPassword += random.Next(9).ToString();
            }

            
            ResolveEmailServiceRepository().SendEmail(forgottenPassword.email, newPassword);
        }
    }
}
