using Library.Entities;
using Library.Models;

namespace Library.Services
{
    public interface IBookService
    {
        Task<Book> CreateBook(CreateBookDto createBookDto);
        Task<IEnumerable<GetBookDto>> GetAllBooks();
        Task<Book> UpdateBook(UpdateBookDto updateBookDto);


    }
}
