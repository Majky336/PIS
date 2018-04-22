using WebApi.ChybaWsdlService;
using WebApi.Domain.Factory.Interface;
using WebApi.Models.ViewModels;

namespace WebApi.Domain.Factory
{
    public class ErrorsToCompareFactory : IErrorsToCompareFactory
    {
        public ErrorsToCompare CreateErrorToCompare(Chybas error)
        {
            var result = new ErrorsToCompare
            {
                OldValue = error.staryUdaj,
                NewValue = error.novyUdaj,
                UserId = error.pouzivatel_id,
                CopyId = error.vytlacok_id,
                PropertyName = error.name
            };

            return result;
        }
    }
}