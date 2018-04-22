using System;

namespace WebApi.Models.ViewModels
{
    public class BookViewModel
    {
        public int CopyId { get; set; }
        
        public string BookName { get; set; }
        public string Isbn { get; set; }
        public string Author { get; set; }
        public string Genre { get; set; }
        public string Description { get; set; }
        public DateTime YearOfPublication { get; set; }

        public string CopyName { get; set; }
        public string Publishers { get; set; }
        public int NumberOfPages { get; set; }
        public string BindingType { get; set; }
        public string ReleaseFormat { get; set; }
        public string Language { get; set; }
    }
}