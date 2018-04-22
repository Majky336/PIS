using System;
using System.Collections.Generic;

namespace WebApi.Models.ViewModels
{
    public class ErrorViewModel
    {
        public string Name { get; set; }
        public string ISBN { get; set; }
        public DateTime YearOfPublication { get; set; }
        public List<ErrorsToCompare> Errors { get; set; }
    }
}