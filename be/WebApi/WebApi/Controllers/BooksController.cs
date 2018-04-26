using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using WebApi.Domain.Factory;
using WebApi.Domain.ServiceRepositories;
using WebApi.Domain.Services.Interfaces;
using WebApi.Domain.Services;

namespace WebApi.Controllers
{
    public class BooksController : ApiController
    {
        protected virtual IBookService ResolveBookService()
        {
            return new BookService(new KnihaServiceRepository(), new VytlacokServiceRepository(), new BookViewModelFactory(), new ErrorServiceRepository());
        }

        protected virtual JsonSerializer ResolveJsonSerializer()
        {
            return new JsonSerializer();
        }

        // GET: api/Books
        // GET: "/books" - Parmas: null - Return: books-array[Book] === To BOOK neviem ci teraz vratis vytlacok alebo knihu, idealne asi mozno informacie z oboch a ja si to rozbijem uz potom tak ako potrebujem
        /// <summary>
        /// Get books from db
        /// </summary>
        /// <returns>HttpResponseMessage</returns>
        [HttpGet]
        public HttpResponseMessage Books()
        {
            var books = ResolveBookService().GetBooks();
            
            var message = ResolveJsonSerializer().GetJson(books.ToArray());

            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(message, Encoding.UTF8, "application/json");
            return response;
        }
    }
}
