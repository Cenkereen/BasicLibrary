namespace Library.Models
{
    public class CreateBookDto
    {
        public required string Title { get; set; }
        public required string Author { get; set; }
        public required string ISBN { get; set; }
        public int Count { get; set; }
        public int LibraryId { get; set; }
    }   
}