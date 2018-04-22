using WebApi.ChybaWsdlService;
using WebApi.Models.ViewModels;

namespace WebApi.Domain.Factory.Interface
{
    public interface IErrorsToCompareFactory
    {
        ErrorsToCompare CreateErrorToCompare(Chybas error);
    }
}