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
                UserID = error.pouzivatel_id,
                CopyID = error.vytlacok_id,
                PropertyName = error.name
            };

            return result;
        }
    }
}