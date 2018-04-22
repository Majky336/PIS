using System.Collections.Generic;
using System.Linq;
using WebApi.Domain.Factory.Interface;
using WebApi.Domain.ServiceRepositories.Interfaces;
using WebApi.Domain.Services.Interfaces;
using WebApi.Models.ViewModels;

namespace WebApi.Domain.Services
{
    public class ErrorService : IErrorService
    {
        private readonly IErrorServiceRepository _errorServiceRepository;
        private readonly IChybaFactory _chybaFactory;
        private readonly ISendMailService _sendMailService;
        private readonly IKnihaServiceRepository _knihaServiceRepository;
        private readonly IVytlacokServiceRepository _vytlacokServiceRepository;
        private readonly IErrorViewModelFactory _errorViewModelFactory;
        private readonly IPouzivatelServiceRepository _pouzivatelServiceRepository;

        public ErrorService(IErrorServiceRepository errorServiceRepository, IChybaFactory chybaFactory, ISendMailService sendMailService, IKnihaServiceRepository knihaServiceRepository,
            IVytlacokServiceRepository vytlacokServiceRepository, IErrorViewModelFactory errorViewModelFactory, IPouzivatelServiceRepository pouzivatelServiceRepository)
        {
            _errorServiceRepository = errorServiceRepository;
            _chybaFactory = chybaFactory;
            _sendMailService = sendMailService;
            _knihaServiceRepository = knihaServiceRepository;
            _vytlacokServiceRepository = vytlacokServiceRepository;
            _errorViewModelFactory = errorViewModelFactory;
            _pouzivatelServiceRepository = pouzivatelServiceRepository;
        }

        public void SaveAllErrors(List<ErrorForSaveViewModel> errors)
        {
            var errorsForSave = errors.Where(er => er != null).Where(er => er.NewValue != er.OldValue).ToList();

            foreach (var error in errorsForSave)
            {
                var erroForSave = _chybaFactory.CreateChyba(error);
                _errorServiceRepository.SaveError(erroForSave);
            }

            var email = _pouzivatelServiceRepository.GetPouzivatelById(errors.First().UserId).email;

            _sendMailService.SendEmail(email, errorsForSave);
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