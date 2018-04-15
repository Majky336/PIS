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
            var user = ResolvePouzivatelServiceRepository().GetPouzivatel(o.email, o.heslo);

            var json = ResolveJsonSerializer().GetJson(user);

            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(json, Encoding.UTF8, "application/json");
            return response;
        }
    }
}
