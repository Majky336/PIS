using System.Collections.Generic;
using WebApi.Models.ViewModels;

namespace WebApi.Domain.Services
{
    public interface IResultService
    {
        void DoStuf(List<ResultViewModel> resulstViewModel);
    }
}