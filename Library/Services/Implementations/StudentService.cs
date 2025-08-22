using Library.Data;
using Library.Entities;
using Library.Models;
using Microsoft.EntityFrameworkCore;

namespace Library.Services.Implementations
{
    public class StudentService : IStudentService
    {
        private readonly LibraryDbContext _context;

        public StudentService(LibraryDbContext context)
        {
            _context = context;
        }

        public async Task<GetStudentDto?> GetStudentById(int id)
        {
            return await _context.Students
                .Where(s => s.Id == id)
                .Select(s => new GetStudentDto
                {
                    Id = s.Id,
                    FullName = s.FullName,
                    Email = s.Email,
                    StudentBooks = s.StudentBooks
                        .Select(sb => new StudentBookDto
                        {
                            BookId = sb.BookId,
                            BookTitle = sb.Book.Title
                        })
                        .ToList()
                })
                .FirstOrDefaultAsync();
        }


        public async Task<Student> CreateStudent(CreateStudentDto createStudentDto)
        {
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(createStudentDto.Password);

            var student = new Student
            {
                FullName = createStudentDto.FullName,
                Email = createStudentDto.Email,
                Password = hashedPassword
            };

            _context.Students.Add(student);
            await _context.SaveChangesAsync();
            return student;
        }

        public async Task<int> LoginStudent(LoginStudentDto loginStudentDto)
        {
            var student = await _context.Students
                .FirstOrDefaultAsync(s => s.Email == loginStudentDto.Email);

            if (student == null)
                return -1;

            bool isValid = BCrypt.Net.BCrypt.Verify(loginStudentDto.Password, student.Password);
            if (student == null || !isValid)
                return -1;

            return student.Id;
        }

        public async Task<string> BorrowBookAsync(BorrowBookDto dto)
        {
            var student = await _context.Students
                .Include(s => s.StudentBooks)
                .FirstOrDefaultAsync(s => s.Id == dto.StudentId);

            if (student == null)
                return "Student not found";

            var book = await _context.Books
                .FirstOrDefaultAsync(b => b.Title == dto.BookTitle);

            if (book == null)
                return "Book not found";

            if (book.Count <= 0)
                return "Book not available";

            var studentBook = new StudentBook
            {
                StudentId = student.Id,
                BookId = book.Id
            };

            _context.StudentBooks.Add(studentBook);
            book.Count -= 1;

            await _context.SaveChangesAsync();

            return "successful";
        }


    }
}
