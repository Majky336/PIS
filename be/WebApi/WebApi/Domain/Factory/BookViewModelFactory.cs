using WebApi.BookWsdlService;
using WebApi.Domain.Factory.Interface;
using WebApi.Models.ViewModels;
using WebApi.VytlacokWsdlReference;

namespace WebApi.Domain.Factory
{
    public class BookViewModelFactory : IBookViewModelFactory
    {
        public BookViewModel CreateBookViewModel(Knihas kniha, Vytlacoks vytlacok)
        {
            var result = new BookViewModel
            {
                CopyId = vytlacok.id,
                Author = kniha.autor,
                Isbn = kniha.ISBN,
                BookName = kniha.name,
                Description = kniha.popis,
                Genre = kniha.zaner,
                YearOfPublication = kniha.rokVydania,

                BindingType = vytlacok.typVazby,
                CopyName = vytlacok.name,
                Language = vytlacok.jazyk,
                NumberOfPages = vytlacok.pocetStran,
                Publishers = vytlacok.vydavatelstvo,
                ReleaseFormat = vytlacok.formatVydania
            };

            return result;
        }
    }
}