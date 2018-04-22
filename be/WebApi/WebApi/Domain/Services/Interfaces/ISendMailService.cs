using System.Collections.Generic;
using WebApi.Models.ViewModels;

namespace WebApi.Domain.Services.Interfaces
{
    public interface ISendMailService
    {
        void SendEmail(string email, List<ErrorForSaveViewModel> errors);
        void SendEmail(string email, string password);
    }
}