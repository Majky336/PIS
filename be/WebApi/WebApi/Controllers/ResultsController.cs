using System.Linq;
using System.Web.Http;
using WebApi.Domain.Factory;
using WebApi.Domain.ServiceRepositories;
using WebApi.Domain.Services;
using WebApi.Domain.Services.Interfaces;
using WebApi.Models.ViewModels;

namespace WebApi.Controllers
{
    public class ResultsController : ApiController
    {
        protected virtual IResultService ResolveResultService()
        {
            return new ResultService(new KnihaServiceRepository(), new VytlacokServiceRepository(), new ErrorServiceRepository(), new ChybaFactory(),
                new PouzivatelServiceRepository(new PouzivatelFactory()), new EmailServiceRepository());
        }

        // POST: api/Results
        // POST "/xxx" Params object - arrayOfErrors - old, new, user, nameOfparam, adminID, copyID, isAccepted[true / false]
        [HttpPost]
        public void Post(ResultViewModel[] resultsViewModel)
        {
            ResolveResultService().DoStuf(resultsViewModel.ToList());
        }
    }
}
