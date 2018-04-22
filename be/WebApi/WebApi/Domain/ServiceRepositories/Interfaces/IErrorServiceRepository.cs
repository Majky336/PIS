using System.Collections.Generic;
using WebApi.ChybaWsdlService;

namespace WebApi.Domain.ServiceRepositories.Interfaces
{
    public interface IErrorServiceRepository
    {
        void SaveError(Chyba error);
        List<Chybas> GerAllErrors();
        List<Chybas> GetErrorsByCopyId(int id);
        void UpdateError(Chyba chyba);
    }
}