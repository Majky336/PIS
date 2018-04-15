using WebApi.Domain.Factory.Interface;
using WebApi.PouzivatelService;

namespace WebApi.Domain.Factory
{
    public class PouzivatelFactory : IPouzivatelFactory
    {
        public Pouzivatel GetPouzivatel(Pouzivatels pouzivatels)
        {
            var result = new Pouzivatel
            {
                id = pouzivatels.id,
                heslo = pouzivatels.heslo,
                body = pouzivatels.body,
                email = pouzivatels.email,
                datRegistracie = pouzivatels.datRegistracie,
                name = pouzivatels.name,
                poslednePrihlasenie = pouzivatels.datRegistracie,
                prihlasovacieMeno = pouzivatels.prihlasovacieMeno,
                rola = pouzivatels.rola
            };

            return result;
        }
    }
}