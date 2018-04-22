using System.Linq;
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
    public class ErrorsController : ApiController
    {
        protected virtual IErrorService ResolveErrorService()
        {
            return new ErrorService(new ErrorServiceRepository(), new ChybaFactory(), new EmailServiceRepository(), new KnihaServiceRepository(), new VytlacokServiceRepository(), new ErrorViewModelFactory(new ErrorsToCompareFactory()));
        }

        protected virtual JsonSerializer ResolveJsonSerializer()
        {
            return new JsonSerializer();
        }

        // Post: api/Errors
        // POST: "/Errors" Parrams: array[Error] - pouzivatelID, staryUdaj, novyUdaj, nazovProperty
        [HttpPost]
        public void SaveErrors(ErrorForSaveViewModel[] errorForSaveViewModel)
        {
            ResolveErrorService().SaveAllErrors(errorForSaveViewModel.ToList());
        }

        // Get: api/Errors
        // GET: "/errors" Parrams null return ArrayOf[asdasdasdas] copyName, ISBN, yearOfPublicitation, arrayOfErrors - odl new userID nameOfparam
        [HttpGet]
        public HttpResponseMessage GetErrors()
        {
            var result = ResolveErrorService().GetErrors();

            var json = ResolveJsonSerializer().GetJson(result);
            var goodResponse = Request.CreateResponse(HttpStatusCode.OK);
            goodResponse.Content = new StringContent(json, Encoding.UTF8, "application/json");
            return goodResponse;
        }

    }
}
