using WebApi.ChybaWsdlService;
using WebApi.Models.ViewModels;

namespace WebApi.Domain.Factory.Interface
{
    public interface IErrorsToCompareFactory
    {
        ErrorToCompare CreateErrorToCompare(Chybas error);
    }
}