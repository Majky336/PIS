using System.Collections.Generic;
using System.Linq;
using WebApi.Domain.Factory.Interface;
using WebApi.PouzivatelService;

namespace WebApi.Domain.ServiceRepositories
{
    public class PouzivatelServiceRepository
    {
        private readonly IPouzivatelFactory _pouzivatelFactory;

        public PouzivatelServiceRepository(IPouzivatelFactory pouzivatelFactory)
        {
            _pouzivatelFactory = pouzivatelFactory;
        }

        public void UpdatePouzivatel(string email, string newPassword)
        {
            var user = GetPouzivatels(email).FirstOrDefault();

            user.heslo = newPassword;

            SavePouzivatel(user);
        }

        public List<Pouzivatels> GetPouzivatels(string email)
        {
            var service = new Team024PouzivatelPortTypeClient();

            var result = service.getByAttributeValue("email", email, new int?[] { });

            return result.ToList();
        }

        public Pouzivatels GetPouzivatel(string email, string password)
        {
            var users = GetPouzivatels(email);

            var result = users.FirstOrDefault(user => user.heslo == password);

            return result;
        }

        public void SavePouzivatel(Pouzivatels pouzivatels)
        {
            var service = new Team024PouzivatelPortTypeClient();

            var user = _pouzivatelFactory.GetPouzivatel(pouzivatels);

            service.update("024", "FYmoj1", pouzivatels.id, user);
        }
    }
}