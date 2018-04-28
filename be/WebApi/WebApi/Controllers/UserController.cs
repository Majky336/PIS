using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using WebApi.Domain.Factory;
using WebApi.Domain.ServiceRepositories;
using WebApi.Domain.Services;
using WebApi.Domain.Services.Interfaces;
using WebApi.Models.ViewModels;

namespace WebApi.Controllers
{
    public class UserController : ApiController
    {
        protected virtual IMembershipService ResolverMembershipService()
        {
            return new MembershipService(new PouzivatelServiceRepository(new PouzivatelFactory()));
        }

        protected virtual JsonSerializer ResolveJsonSerializer()
        {
            return new JsonSerializer();
        }

        // POST: api/User/
        [HttpPost]
        public HttpResponseMessage UpdateMembership(MembershipForUpdateViewModel membershipForUpdateViewModel)
        {
            var result = ResolverMembershipService().DoStuff(membershipForUpdateViewModel);

            var jsonSerializer = ResolveJsonSerializer();

            if (result != null)
            {
                var json = jsonSerializer.GetJson(result);
                var goodResponse = Request.CreateResponse(HttpStatusCode.OK);
                goodResponse.Content = new StringContent(json, Encoding.UTF8, "application/json");
                return goodResponse;
            }

            var message = "Členské sa nepodarilo aktualizovat";

            var badResponse = Request.CreateResponse(HttpStatusCode.BadRequest);
            badResponse.Content = new StringContent(message, Encoding.UTF8, "application/json");
            return badResponse;
        }
    }
}
