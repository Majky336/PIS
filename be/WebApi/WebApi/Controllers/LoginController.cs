using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using WebApi.Domain;
using WebApi.PouzivatelService;

namespace WebApi.Controllers
{
    public class LoginController : ApiController
    {
        public virtual JsonSerializer GetJsonSerializer()
        {
            return new JsonSerializer();
        }

        // POST: api/Login
        //POST: "/login" - Params: e-mail-string, heslo-string - Return: user-Pouzivatel || null 
        [HttpPost]
        public HttpResponseMessage Login(string email, string heslo)
        {
            var service = new Team024PouzivatelPortTypeClient();

            var result = service.getByAttributeValue("email", email, new int?[] { });

            var pouzivatel = result.FirstOrDefault(user => user.heslo == heslo);

            var json = GetJsonSerializer().GetJson(pouzivatel);

            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(json, Encoding.UTF8, "application/json");
            return response;
        }
    }
}
