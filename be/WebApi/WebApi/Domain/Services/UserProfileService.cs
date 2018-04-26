using System.Collections.Generic;
using System.Linq;
using WebApi.Domain.Factory.Interface;
using WebApi.Domain.ServiceRepositories.Interfaces;
using WebApi.Domain.Services.Interfaces;
using WebApi.Models.ViewModels;

namespace WebApi.Domain.Services
{
    public class UserProfileService : IUserProfileService
    {
        private readonly IErrorServiceRepository _errorServiceRepository;
        private readonly IVytlacokServiceRepository _vytlacokServiceRepository;
        private readonly IHistoryErrorFactory _historyErrorFactory;

        public UserProfileService(IErrorServiceRepository errorServiceRepository, IVytlacokServiceRepository vytlacokServiceRepository, IHistoryErrorFactory historyErrorFactory)
        {
            _errorServiceRepository = errorServiceRepository;
            _vytlacokServiceRepository = vytlacokServiceRepository;
            _historyErrorFactory = historyErrorFactory;
        }

        public List<HistoryError> GetUserErrors(int userId)
        {
            var errors = _errorServiceRepository.GetUserErrors(userId);

            var result = new List<HistoryError>();

            var groupedErrors = errors.GroupBy(er => er.vytlacok_id).ToList();

            foreach (var error in groupedErrors)
            {
                var copyName = _vytlacokServiceRepository.GetById(error.Key).name;

                result.AddRange(error.Select(er => _historyErrorFactory.CreateHistoryError(er, copyName)));
            }

            return result;
        }
    }
}