using System.Collections.Generic;
using WebApi.Models.ViewModels;

namespace WebApi.Domain.Services.Interfaces
{
    public interface IUserProfileService
    {
        List<HistoryError> GetUserErrors(int userId);
    }
}