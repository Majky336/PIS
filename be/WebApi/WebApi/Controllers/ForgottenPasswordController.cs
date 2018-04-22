using System.Web.Http;
using WebApi.Domain.Factory;
using WebApi.Domain.ServiceRepositories;
using WebApi.Domain.ServiceRepositories.Interfaces;
using WebApi.Domain.Services;
using WebApi.Domain.Services.Interfaces;
using WebApi.Models.ViewModels;

namespace WebApi.Controllers
{
    public class ForgottenPasswordController : ApiController
    {
        protected virtual ISendMailService ResolveSendMailService()
        {
            return new SendMailService(new EmailServiceRepository());
        }

        protected virtual IPouzivatelServiceRepository ResolvePouzivatelServiceRepository()
        {
            return new PouzivatelServiceRepository(new PouzivatelFactory());
        }

        // POST: api/ForgottenPassword
        // POST: "/forgottenPassword" - Params: email-string - Return: void
        [HttpPost]
        public void ForgottenPassword(ForgottenPasswordViewModel forgottenPassword)
        {
            var password = ResolvePouzivatelServiceRepository().GetPouzivatelHeslo(forgottenPassword.Email);

            if (password == null)
                return;

            ResolveSendMailService().SendEmail(forgottenPassword.Email, password);
        }
    }
}
