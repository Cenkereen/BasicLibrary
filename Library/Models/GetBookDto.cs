namespace Library.Models
{
    public class GetBookDto
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Author { get; set; }
        public required string ISBN { get; set; }
        public int Count { get; set; }
        public string LibraryName { get; set; } = null!;
    }
}