using System.Collections.Generic;
using System.Linq;
using WebApi.ChybaWsdlService;
using WebApi.Domain.ServiceRepositories.Interfaces;

namespace WebApi.Domain.ServiceRepositories
{
    public class ErrorServiceRepository : IErrorServiceRepository
    {
        public void SaveError(Chyba error)
        {
            var service = new Team024ChybaPortTypeClient();

            service.insert("024", "FYmoj1", error);

            service.Close();
        }

        public List<Chybas> GerAllErrors()
        {
            var service = new Team024ChybaPortTypeClient();

            var result = service.getAll();

            service.Close();

            return result.ToList();
        }

        public List<Chybas> GetErrorsByCopyId(int id)
        {
            var service = new Team024ChybaPortTypeClient();

            var result = service.getByAttributeValue("vytlacok_id", id.ToString(), new int?[]{});

            service.Close();

            return result.ToList();
        }

        public void UpdateError(Chyba chyba)
        {
            var service = new Team024ChybaPortTypeClient();

            service.update("024", "FYmoj1", chyba.id, chyba);

            service.Close();
        }
    }
}