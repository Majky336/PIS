using System.Collections.Generic;
using WebApi.Models.ViewModels;

namespace WebApi.Domain.Services.Interfaces
{
    public interface IErrorService
    {
        void SaveAllErrors(List<ErrorForSaveViewModel> errors);
        List<ErrorViewModel> GetErrors();
    }
}