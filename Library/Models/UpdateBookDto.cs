namespace Library.Models
{
    public class UpdateBookDto
    {
        public required string TitleToChange { get; set; }
        public required string NewTitle { get; set; }
        public required string Author { get; set; }
        public required string ISBN { get; set; }
        public int Count { get; set; }
        public int LibraryId { get; set; }
    }   
}