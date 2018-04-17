using System.Collections.Generic;
using WebApi.BookWsdlService;

namespace WebApi.Domain.ServiceRepositories.Interfaces
{
    public interface IKnihaServiceRepository
    {
        List<Knihas> GetAll();
    }
}