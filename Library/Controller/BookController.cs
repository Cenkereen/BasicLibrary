using Library.Entities;
using Library.Models;
using Library.Services;
using Microsoft.AspNetCore.Mvc;

namespace Library.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpPost("create")]
        public async Task<ActionResult<Book>> CreateBook(CreateBookDto createBookDto)
        {
            var book = await _bookService.CreateBook(createBookDto);
            return Ok(book);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetBookDto>>> GetAllBooks()
        {
            var books = await _bookService.GetAllBooks();
            return Ok(books);
        }

        [HttpPut("update")]
        public async Task<ActionResult<Book>> UpdateBook(UpdateBookDto updateBookDto)
        {
            try
            {
                var updatedBook = await _bookService.UpdateBook(updateBookDto);
                return Ok(updatedBook);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}