using LibMgmtAPI.Models;

namespace LibMgmtAPI.Interfaces
{
    public interface IBookManager
    {
        int AddBook(Book book);
        int UpdateBook(int id, Book book);
        int DeleteBook(int id);

        List<Book> GetBooks();
        Book FindBookById(int id);
        List<Book> FindBookByName(string name);
    }
}
