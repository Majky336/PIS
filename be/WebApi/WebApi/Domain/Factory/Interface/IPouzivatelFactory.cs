using WebApi.PouzivatelWsdlService;

namespace WebApi.Domain.Factory.Interface
{
    public interface IPouzivatelFactory
    {
        Pouzivatel GetPouzivatel(Pouzivatels pouzivatels);
    }
}