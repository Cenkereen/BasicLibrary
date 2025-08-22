using Library.Data;
using Library.Entities;
using Library.Models;
using Microsoft.EntityFrameworkCore;

namespace Library.Services
{
    public class BookService : IBookService
    {
        private readonly LibraryDbContext _context;

        public BookService(LibraryDbContext context)
        {
            _context = context;
        }

        public async Task<Book> CreateBook(CreateBookDto createBookDto)
        {
            var book = new Book
            {
                Title = createBookDto.Title,
                Author = createBookDto.Author,
                ISBN = createBookDto.ISBN,
                Count = createBookDto.Count,
                LibraryId = createBookDto.LibraryId
            };

            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            return book;
        }

        public async Task<IEnumerable<GetBookDto>> GetAllBooks()
        {
            return await _context.Books
                .Include(b => b.Library)
                .Select(b => new GetBookDto
                {
                    Id = b.Id,
                    Title = b.Title,
                    Author = b.Author,
                    ISBN = b.ISBN,
                    Count = b.Count,
                    LibraryName = b.Library.Name
                })
                .ToListAsync();
        }

        public async Task<Book> UpdateBook(UpdateBookDto updateBookDto)
        {
            var book = await _context.Books
                .FirstOrDefaultAsync(b => b.Title == updateBookDto.TitleToChange);

            if (book == null)
                throw new KeyNotFoundException($"Book '{updateBookDto.TitleToChange}' not found.");

            book.Title = updateBookDto.NewTitle;
            book.Author = updateBookDto.Author;
            book.ISBN = updateBookDto.ISBN;
            book.Count = updateBookDto.Count;
            book.LibraryId = updateBookDto.LibraryId;

            await _context.SaveChangesAsync();

            return book;
        }
    }
}
