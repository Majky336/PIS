using System.Collections.Generic;
using WebApi.Models.ViewModels;

namespace WebApi.Domain.Services.Interfaces
{
    public interface IResultService
    {
        void DoStuf(List<ResultViewModel> resulstViewModel);
    }
}