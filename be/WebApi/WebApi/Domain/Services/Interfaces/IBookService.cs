using System.Collections.Generic;
using WebApi.Models.ViewModels;

namespace WebApi.Domain.Services.Interfaces
{
    public interface IBookService
    {
        List<BookViewModel> GetBooks();
    }
}