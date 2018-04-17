using System.Collections.Generic;
using System.Linq;
using WebApi.Domain.ServiceRepositories.Interfaces;
using WebApi.VytlacokWsdlReference;

namespace WebApi.Domain.ServiceRepositories
{
    public class VytlacokServiceRepository : IVytlacokServiceRepository
    {
        public List<Vytlacoks> GetAll()
        {
            var service = new Team024VytlacokPortTypeClient();

            var result = service.getAll();

            return result.ToList();
        }
    }
}