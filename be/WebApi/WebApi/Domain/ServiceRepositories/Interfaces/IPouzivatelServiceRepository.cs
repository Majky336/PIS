using System.Collections.Generic;
using WebApi.PouzivatelWsdlService;

namespace WebApi.Domain.ServiceRepositories.Interfaces
{
    public interface IPouzivatelServiceRepository
    {
        Pouzivatels GetPouzivatel(string email, string password);
        string GetPouzivatelHeslo(string email);
        List<Pouzivatels> GetPouzivatels(string email);
        void SaveUpdatedPouzivatel(Pouzivatels pouzivatels);
        Pouzivatel GetPouzivatelById(int id);
    }
}