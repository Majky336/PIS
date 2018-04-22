using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.ChybaWsdlService;
using WebApi.Domain.Factory.Interface;
using WebApi.Models.ViewModels;

namespace WebApi.Domain.Factory
{
    public class ErrorViewModelFactory : IErrorViewModelFactory
    {
        private readonly IErrorsToCompareFactory _errorsToCompareFactory;

        public ErrorViewModelFactory(IErrorsToCompareFactory errorsToCompareFactory)
        {
            _errorsToCompareFactory = errorsToCompareFactory;
        }

        public ErrorViewModel CreatErrorViewModel(string name, string isbn, DateTime yearOfPublication,
            List<Chybas> errors)
        {
            var result = new ErrorViewModel
            {
                Isbn = isbn,
                Name = name,
                YearOfPublication = yearOfPublication,
                Errors = errors.Select(er => _errorsToCompareFactory.CreateErrorToCompare(er)).ToList()
            };

            return result;
        }
    }
}