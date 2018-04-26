using System;

namespace WebApi.Models.ViewModels
{
    public class BookViewModel
    {
        public int CopyId { get; set; }

        public string BookName { get; set; }


        public string Isbn { get; set; }
        public bool IsIsbnAvaliable { get; set; }

        public string Author { get; set; }
        public bool IsAuthorAvaliable { get; set; }

        public string Genre { get; set; }
        public bool IsGenreAvaliable { get; set; }

        public string Description { get; set; }
        public bool IsDescriptionAvaliable { get; set; }

        public DateTime YearOfPublication { get; set; }
        public bool IsYearOfPublicationAvaliable { get; set; }

        public string CopyName { get; set; }
        public bool IsCopyNameAvaliable { get; set; }

        public string Publishers { get; set; }
        public bool IsPublishersAvaliable { get; set; }

        public int NumberOfPages { get; set; }
        public bool IsNumberOfPagesAvaliable { get; set; }

        public string BindingType { get; set; }
        public bool IsBindingTypeAvaliable { get; set; }

        public string ReleaseFormat { get; set; }
        public bool IsReleaseFormatAvaliable { get; set; }

        public string Language { get; set; }
        public bool IsLanguageAvaliable { get; set; }
    }
}