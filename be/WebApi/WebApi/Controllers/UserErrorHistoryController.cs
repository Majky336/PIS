using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using WebApi.Domain.Factory;
using WebApi.Domain.ServiceRepositories;
using WebApi.Domain.Services;
using WebApi.Domain.Services.Interfaces;

namespace WebApi.Controllers
{
    public class UserErrorHistoryController : ApiController
    {
        protected virtual JsonSerializer ResolveJsonSerializer()
        {
            return new JsonSerializer();
        }

        protected virtual IUserProfileService ResolveUserProfileService()
        {
            return new UserProfileService(new ErrorServiceRepository(), new VytlacokServiceRepository(), new HistoryErrorFactory());
        }

        // GET: api/UserErrorHistory
        [HttpGet]
        public HttpResponseMessage UserErrorHistory(int userId)
        {
            var result = ResolveUserProfileService().GetUserErrors(userId);

            var json = ResolveJsonSerializer().GetJson(result);
            var goodResponse = Request.CreateResponse(HttpStatusCode.OK);
            goodResponse.Content = new StringContent(json, Encoding.UTF8, "application/json");
            return goodResponse;
        }
    }
}
