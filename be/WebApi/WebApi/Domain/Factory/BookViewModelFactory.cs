using System.Collections.Generic;
using System.Linq;
using WebApi.BookWsdlService;
using WebApi.ChybaWsdlService;
using WebApi.Domain.Factory.Interface;
using WebApi.Models.ViewModels;
using WebApi.VytlacokWsdlReference;

namespace WebApi.Domain.Factory
{
    public class BookViewModelFactory : IBookViewModelFactory
    {
        public BookViewModel CreateBookViewModel(Knihas kniha, Vytlacoks vytlacok, List<Chybas> errors)
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
                ReleaseFormat = vytlacok.formatVydania,

                IsAuthorAvaliable = errors.All(er => er.name != "Author"),
                IsBindingTypeAvaliable = errors.All(er => er.name != "BindingType"),
                IsCopyNameAvaliable = errors.All(er => er.name != "CopyName"),
                IsDescriptionAvaliable = errors.All(er => er.name != "Description"),
                IsGenreAvaliable = errors.All(er => er.name != "Genre"),
                IsIsbnAvaliable = errors.All(er => er.name != "Isbn"),
                IsLanguageAvaliable = errors.All(er => er.name != "Language"),
                IsNumberOfPagesAvaliable = errors.All(er => er.name != "NumberOfPages"),
                IsPublishersAvaliable = errors.All(er => er.name != "Publishers"),
                IsReleaseFormatAvaliable = errors.All(er => er.name != "ReleaseFormat"),
                IsYearOfPublicationAvaliable = errors.All(er => er.name != "YearOfPublication")
            };



            return result;
        }
    }
}