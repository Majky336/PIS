using WebApi.BookWsdlService;
using WebApi.Models.ViewModels;
using WebApi.VytlacokWsdlReference;

namespace WebApi.Domain.Factory.Interface
{
    public interface IBookViewModelFactory
    {
        BookViewModel CreateBookViewModel(Knihas kniha, Vytlacoks vytlacok);
    }
}