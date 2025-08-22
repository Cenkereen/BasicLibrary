using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Library.Entities
{
    public class Book
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Author { get; set; }
        public required string ISBN { get; set; }
        public int Count { get; set; }
        public int LibraryId { get; set; }

        public Library? Library { get; set; }

        public ICollection<StudentBook> StudentBooks { get; set; } = new List<StudentBook>();
    }
}