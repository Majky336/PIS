using System;
using System.Web.Http;
using WebApi.Domain.Factory;
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

        protected virtual PouzivatelServiceRepository ResolvePouzivatelServiceRepository()
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

            ResolveEmailServiceRepository().SendEmail(forgottenPassword.Email, password);
        }
    }
}
