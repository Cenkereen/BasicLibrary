using Library.Data;
using Library.Models;
using Microsoft.EntityFrameworkCore;

namespace Library.Services
{
    public class LibraryService : ILibraryService
    {
        private readonly LibraryDbContext _context;

        public LibraryService(LibraryDbContext context)
        {
            _context = context;
        }

        public async Task<Entities.Library> CreateLibrary(CreateLibraryDto createLibraryDto)
        {
            var library = new Entities.Library
            {
                Name = createLibraryDto.Name,
                Location = createLibraryDto.Location
            };

            _context.Libraries.Add(library);
            await _context.SaveChangesAsync();

            return library;
        }

        public async Task<IEnumerable<GetLibraryDto>> GetAllLibraryNames()
        {
            return await _context.Libraries
                .Select(l => new GetLibraryDto 
                { 
                    Id = l.Id, 
                    Name = l.Name 
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<GetBookDto>> GetBooksByLibraryName(string libraryName)
        {
            return await _context.Books
                .Where(b => b.Library.Name == libraryName)
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

    }
}
