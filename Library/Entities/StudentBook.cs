namespace Library.Entities
{
    public class StudentBook
    {
        public int StudentId { get; set; }
        public Student Student { get; set; } = null!;

        public int BookId { get; set; }
        public Book Book { get; set; } = null!;
    }

}