using Library.Entities;
using Library.Models;

namespace Library.Services
{
    public interface IStudentService
    {
        Task<GetStudentDto?> GetStudentById(int id);
        Task<Student> CreateStudent(CreateStudentDto createStudentDto);
        Task<int> LoginStudent(LoginStudentDto loginStudentDto);
        Task<string> BorrowBookAsync(BorrowBookDto dto);

    }
}
