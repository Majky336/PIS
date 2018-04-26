using WebApi.ChybaWsdlService;
using WebApi.Domain.Factory.Interface;
using WebApi.Models.ViewModels;

namespace WebApi.Domain.Factory
{
    public class HistoryErrorFactory : IHistoryErrorFactory
    {
        public HistoryError CreateHistoryError(Chybas error, string copyName)
        {
            var result = new HistoryError
            {
                NewValue = error.novyUdaj,
                Confirmed = error.potvrdena,
                CreatedAt = error.datZalozenia,
                Resolved = error.vyhodnotena,
                CopyName = copyName,
                PropertyName = error.name
            };

            return result;
        }
    }
}