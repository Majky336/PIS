using System.Collections.Generic;
using System.Linq;
using WebApi.Domain.Factory.Interface;
using WebApi.Domain.ServiceRepositories;
using WebApi.Domain.ServiceRepositories.Interfaces;
using WebApi.Domain.Services.Interfaces;
using WebApi.Models.ViewModels;

namespace WebApi.Domain.Services
{
    public class ErrorService : IErrorService
    {
        private readonly IErrorServiceRepository _errorServiceRepository;
        private readonly IChybaFactory _chybaFactory;
        private readonly IEmailServiceRepository _emailServiceRepository;
        private readonly IKnihaServiceRepository _knihaServiceRepository;
        private readonly IVytlacokServiceRepository _vytlacokServiceRepository;
        private readonly IErrorViewModelFactory _errorViewModelFactory;

        public ErrorService(IErrorServiceRepository errorServiceRepository, IChybaFactory chybaFactory,
            IEmailServiceRepository emailServiceRepository, IKnihaServiceRepository knihaServiceRepository,
            IVytlacokServiceRepository vytlacokServiceRepository, IErrorViewModelFactory errorViewModelFactory)
        {
            _errorServiceRepository = errorServiceRepository;
            _chybaFactory = chybaFactory;
            _emailServiceRepository = emailServiceRepository;
            _knihaServiceRepository = knihaServiceRepository;
            _vytlacokServiceRepository = vytlacokServiceRepository;
            _errorViewModelFactory = errorViewModelFactory;
        }

        public void SaveAllErrors(List<ErrorForSaveViewModel> errors)
        {
            var errorsForSave = errors.Where(er => er != null).Where(er => er.NewValue != er.OldValue);

            foreach (var error in errorsForSave)
            {
                var erroForSave = _chybaFactory.CreateChyba(error);
                _errorServiceRepository.SaveError(erroForSave);
            }



            //_emailServiceRepository.SendEmail();
        }

        public List<ErrorViewModel> GetErrors()
        {
            var result = new List<ErrorViewModel>();

            var errors = _errorServiceRepository.GerAllErrors();

            var groupedErrors = errors.GroupBy(er => er.vytlacok_id);

            foreach (var groupedError in groupedErrors)
            {
                var copy = _vytlacokServiceRepository.GetById(groupedError.Key);
                var book = _knihaServiceRepository.GetById(copy.kniha_id);

                result.Add(_errorViewModelFactory.CreatErrorViewModel(copy.name, book.ISBN, book.rokVydania, groupedError.ToList()));
            }

            return result;
        }
    }
}