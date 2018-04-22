using System;
using System.Collections.Generic;
using WebApi.ChybaWsdlService;
using WebApi.Models.ViewModels;

namespace WebApi.Domain.Factory.Interface
{
    public interface IErrorViewModelFactory
    {
        ErrorViewModel CreatErrorViewModel(string name, string isbn, DateTime yearOfPublication, List<Chybas> errors);
    }
}