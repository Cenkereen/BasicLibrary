using Library.Entities;
using Library.Models;
using Library.Services;
using Microsoft.AspNetCore.Mvc;

namespace Library.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;

        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetStudentDto>> GetStudentById([FromRoute] int id)
        {
            var student = await _studentService.GetStudentById(id);

            if (student == null)
                return NotFound("No student found with that ID.");

            return Ok(student);
        }


        [HttpPost("create")]
        public async Task<ActionResult<Student>> CreateStudent(CreateStudentDto createStudentDto)
        {
            var student = await _studentService.CreateStudent(createStudentDto);
            return Ok(student);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginStudentDto dto)
        {
            int id = await _studentService.LoginStudent(dto);
            if (id == -1)
                return BadRequest(new { message = "Invalid credentials" });

            return Ok(new { id }); // <-- wrap in object
        }
        
        [HttpPost("borrow")]
        public async Task<IActionResult> BorrowBook(BorrowBookDto borrowBookDto)
        {
            var result = await _studentService.BorrowBookAsync(borrowBookDto);

            return Ok(result);
        }
    }
}