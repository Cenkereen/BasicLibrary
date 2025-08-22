using Library.Entities;

namespace Library.Models
{
    public class GetStudentDto
    {
        public int Id { get; set; }
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public ICollection<StudentBookDto> StudentBooks { get; set; } = new List<StudentBookDto>();
    }
}
