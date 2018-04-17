using System.Collections.Generic;
using System.Linq;
using WebApi.BookWsdlService;
using WebApi.Domain.ServiceRepositories.Interfaces;

namespace WebApi.Domain.ServiceRepositories
{
    public class KnihaServiceRepository : IKnihaServiceRepository
    {
        public List<Knihas> GetAll()
        {
            var service = new Team024KnihaPortTypeClient();

            var result = service.getAll();

            return result.ToList();
        }
    }
}