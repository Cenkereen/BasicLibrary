using Library.Models;

namespace Library.Services
{
    public interface ILibraryService
    {
        Task<Entities.Library> CreateLibrary(CreateLibraryDto createLibraryDto);
        Task<IEnumerable<GetLibraryDto>> GetAllLibraryNames();
        Task<IEnumerable<GetBookDto>> GetBooksByLibraryName(string libraryName);
    }
}