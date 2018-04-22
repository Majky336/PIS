using WebApi.ChybaWsdlService;
using WebApi.Models.ViewModels;

namespace WebApi.Domain.Factory.Interface
{
    public interface IChybaFactory
    {
        Chyba CreateChyba(ErrorForSaveViewModel errorForSaveViewModel);
    }
}