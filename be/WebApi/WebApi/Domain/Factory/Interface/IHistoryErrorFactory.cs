using WebApi.ChybaWsdlService;
using WebApi.Models.ViewModels;

namespace WebApi.Domain.Factory.Interface
{
    public interface IHistoryErrorFactory
    {
        HistoryError CreateHistoryError(Chybas error, string copyName);
    }
}