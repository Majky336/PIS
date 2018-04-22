using System.Collections.Generic;
using System.Linq;
using WebApi.Domain.Factory.Interface;
using WebApi.Domain.ServiceRepositories.Interfaces;
using WebApi.PouzivatelWsdlService;

namespace WebApi.Domain.ServiceRepositories
{
    public class PouzivatelServiceRepository : IPouzivatelServiceRepository
    {
        private readonly IPouzivatelFactory _pouzivatelFactory;

        public PouzivatelServiceRepository(IPouzivatelFactory pouzivatelFactory)
        {
            _pouzivatelFactory = pouzivatelFactory;
        }

        public string GetPouzivatelHeslo(string email)
        {
            var user = GetPouzivatels(email).FirstOrDefault();

            return user?.heslo;
        }

        public List<Pouzivatels> GetPouzivatels(string email)
        {
            var service = new Team024PouzivatelPortTypeClient();

            var result = service.getByAttributeValue("email", email, new int?[] { });

            service.Close();

            return result.ToList();
        }

        public Pouzivatels GetPouzivatel(string email, string password)
        {
            var users = GetPouzivatels(email);

            var result = users.FirstOrDefault(user => user.heslo == password);

            return result;
        }

        public void SaveUpdatedPouzivatel(Pouzivatels pouzivatels)
        {
            var user = _pouzivatelFactory.GetPouzivatel(pouzivatels);

            SaveUpdatedPouzivatel(user);
        }

        public void SaveUpdatedPouzivatel(Pouzivatel pouzivatel)
        {
            var service = new Team024PouzivatelPortTypeClient();

            service.update("024", "FYmoj1", pouzivatel.id, pouzivatel);

            service.Close();
        }

        public Pouzivatel GetPouzivatelById(int id)
        {
            var service = new Team024PouzivatelPortTypeClient();

            var result = service.getById(id);

            service.Close();

            return result;
        }
    }
}