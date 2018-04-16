using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using WebApi.Domain;
using WebApi.Domain.Factory;
using WebApi.Domain.ServiceRepositories;
using WebApi.Models.ViewModels;

namespace WebApi.Controllers
{

    public class LoginController : ApiController
    {
        protected virtual JsonSerializer ResolveJsonSerializer()
        {
            return new JsonSerializer();
        }

        protected virtual PouzivatelServiceRepository ResolvePouzivatelServiceRepository()
        {
            return new PouzivatelServiceRepository(new PouzivatelFactory());
        }

        // POST: api/Login
        //POST: "/login" - Params: e-mail-string, heslo-string - Return: user-Pouzivatel || null 
        [HttpPost]
        public HttpResponseMessage Login(LoginViewModel o)
        {
            var pouzivatelServiceRepository = ResolvePouzivatelServiceRepository();
            var user = pouzivatelServiceRepository.GetPouzivatel(o.Email, o.Heslo);

            var jsonSerializer = ResolveJsonSerializer();

            if (user != null)
            {
                user.poslednePrihlasenie = DateTime.Now;

                pouzivatelServiceRepository.SaveUpdatedPouzivatel(user);

                var json = jsonSerializer.GetJson(user);
                var goodResponse = Request.CreateResponse(HttpStatusCode.OK);
                goodResponse.Content = new StringContent(json, Encoding.UTF8, "application/json");
                return goodResponse;
            }

            var message = jsonSerializer.GetJson("Prihlasovacie meno alebo heslo je nesprávne.");

            var badResponse = Request.CreateResponse(HttpStatusCode.NotFound);
            badResponse.Content = new StringContent(message, Encoding.UTF8, "application/json");
            return badResponse;
        }
    }
}
