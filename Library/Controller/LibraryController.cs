using Library.Models;
using Library.Services;
using Microsoft.AspNetCore.Mvc;

namespace Library.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class LibraryController : ControllerBase
    {
        private readonly ILibraryService _libraryService;

        public LibraryController(ILibraryService libraryService)
        {
            _libraryService = libraryService;
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateLibrary(CreateLibraryDto createLibraryDto)
        {
            var library = await _libraryService.CreateLibrary(createLibraryDto);
            return Ok(library);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetLibraryDto>>> GetAllLibraryNames()
        {
            var libraries = await _libraryService.GetAllLibraryNames();
            return Ok(libraries);
        }

        [HttpGet("{libraryName}")]
        public async Task<ActionResult<IEnumerable<GetBookDto>>> GetBooksByLibraryName(string libraryName)
        {
            var books = await _libraryService.GetBooksByLibraryName(libraryName);
            return Ok(books);
        }

    }
}
