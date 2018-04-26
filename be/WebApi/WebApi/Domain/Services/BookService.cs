using System.Collections.Generic;
using System.Linq;
using WebApi.Domain.Factory.Interface;
using WebApi.Domain.ServiceRepositories.Interfaces;
using WebApi.Domain.Services.Interfaces;
using WebApi.Models.ViewModels;

namespace WebApi.Domain.Services
{
    public class BookService : IBookService
    {
        private readonly IKnihaServiceRepository _knihaServiceRepository;
        private readonly IVytlacokServiceRepository _vytlacokServiceRepository;
        private readonly IBookViewModelFactory _bookViewModelFactory;
        private readonly IErrorServiceRepository _errorServiceRepository;

        public BookService(IKnihaServiceRepository knihaServiceRepository, IVytlacokServiceRepository vytlacokServiceRepository, IBookViewModelFactory bookViewModelFactory, IErrorServiceRepository errorServiceRepository)
        {
            _knihaServiceRepository = knihaServiceRepository;
            _vytlacokServiceRepository = vytlacokServiceRepository;
            _bookViewModelFactory = bookViewModelFactory;
            _errorServiceRepository = errorServiceRepository;
        }

        public List<BookViewModel> GetBooks()
        {
            var books = _knihaServiceRepository.GetAll();
            var prints = _vytlacokServiceRepository.GetAll();
            var errors = _errorServiceRepository.GerAllErrors();

            if (prints == null || books == null)
            {
                return null;
            }

            var result = new List<BookViewModel>();

            foreach (var copy in prints)
            {
                var book = books.FirstOrDefault(b => b.id == copy.kniha_id);

                var actErrors = errors.Where(er => er.vytlacok_id == copy.id && !er.vyhodnotena).ToList();

                result.Add(_bookViewModelFactory.CreateBookViewModel(book, copy, actErrors));
            }

            return result;
        }
    }
}