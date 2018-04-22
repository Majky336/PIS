using System;
using System.Collections.Generic;

namespace WebApi.Models.ViewModels
{
    public class ErrorViewModel
    {
        public string Name { get; set; }
        public string Isbn { get; set; }
        public DateTime YearOfPublication { get; set; }
        public List<ErrorsToCompare> Errors { get; set; }
    }
}