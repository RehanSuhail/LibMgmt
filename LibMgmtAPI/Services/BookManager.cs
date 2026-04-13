using LibMgmtAPI.Interfaces;
using LibMgmtAPI.Models;
using LibMgmtAPI.Data;
using Microsoft.Data.SqlClient;

namespace LibMgmtAPI.Services
{
    public class BookManager : IBookManager
    {
        private readonly DbHelper _db;

        public BookManager(DbHelper db)
        {
            _db = db;
        }
        public List<Book> GetBooks()
        {
            List<Book> books = new List<Book>();

            try
            {
                using SqlConnection conn = _db.GetConnection();
                conn.Open();

                SqlCommand cmd = new SqlCommand(
                    "SELECT * FROM Books ORDER BY BookId DESC", conn);

                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    books.Add(new Book
                    {
                        BookId = (int)reader["BookId"],
                        Title = reader["Title"].ToString(),
                        Author = reader["Author"].ToString(),
                        Category = reader["Category"].ToString(),
                        Price = (decimal)reader["Price"],
                        LibraryId = (int)reader["LibraryId"]
                    });
                }
            }
            catch
            {
                throw;
            }

            return books;
        }


        public Book FindBookById(int id)
        {
            try
            {
                using SqlConnection conn = _db.GetConnection();
                conn.Open();

                SqlCommand cmd = new SqlCommand("SELECT * FROM Books WHERE BookId=@id", conn);
                cmd.Parameters.AddWithValue("@id", id);

                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    return new Book
                    {
                        BookId = (int)reader["BookId"],
                        Title = reader["Title"].ToString(),
                        Author = reader["Author"].ToString(),
                        Category = reader["Category"].ToString(),
                        Price = (decimal)reader["Price"],
                        LibraryId = (int)reader["LibraryId"]
                    };
                }
                return null;
            }
            catch
            {
                throw;
            }
        }

        public List<Book> FindBookByName(string name)
        {
            List<Book> books = new List<Book>();

            try
            {
                using SqlConnection conn = _db.GetConnection();
                conn.Open();

                SqlCommand cmd = new SqlCommand(
                    "SELECT * FROM Books WHERE LOWER(Title) LIKE '%' + LOWER(@name) + '%'",
                    conn);

                cmd.Parameters.AddWithValue("@name", name);

                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    books.Add(new Book
                    {
                        BookId = (int)reader["BookId"],
                        Title = reader["Title"].ToString(),
                        Author = reader["Author"].ToString(),
                        Category = reader["Category"].ToString(),
                        Price = (decimal)reader["Price"],
                        LibraryId = (int)reader["LibraryId"]
                    });
                }
            }
            catch
            {
                throw;
            }

            return books;
        }


        public int AddBook(Book book)
        {
            try
            {
                using SqlConnection conn = _db.GetConnection();
                conn.Open();

                SqlCommand checkCmd = new SqlCommand(
                    "SELECT COUNT(*) FROM Books WHERE LOWER(Title)=LOWER(@t) AND LOWER(Author)=LOWER(@a) AND LibraryId=@l",
                    conn);

                checkCmd.Parameters.AddWithValue("@t", book.Title);
                checkCmd.Parameters.AddWithValue("@a", book.Author);
                checkCmd.Parameters.AddWithValue("@l", book.LibraryId);

                int count = (int)checkCmd.ExecuteScalar();

                if (count > 0)
                {
                    return -1;
                }

                SqlCommand cmd = new SqlCommand(
                    "INSERT INTO Books (Title,Author,Category,Price,LibraryId) VALUES (@t,@a,@c,@p,@l)",
                    conn);

                cmd.Parameters.AddWithValue("@t", book.Title);
                cmd.Parameters.AddWithValue("@a", book.Author);
                cmd.Parameters.AddWithValue("@c", book.Category);
                cmd.Parameters.AddWithValue("@p", book.Price);
                cmd.Parameters.AddWithValue("@l", book.LibraryId);

                return cmd.ExecuteNonQuery();
            }
            catch
            {
                throw;
            }
        }


        public int UpdateBook(int id, Book book)
        {
            try
            {
                using SqlConnection conn = _db.GetConnection();
                conn.Open();

                SqlCommand checkCmd = new SqlCommand(
                    @"SELECT COUNT(*) FROM Books 
              WHERE LOWER(Title)=LOWER(@t) 
              AND LOWER(Author)=LOWER(@a) 
              AND LibraryId=@l 
              AND BookId <> @id",
                    conn);

                checkCmd.Parameters.AddWithValue("@t", book.Title);
                checkCmd.Parameters.AddWithValue("@a", book.Author);
                checkCmd.Parameters.AddWithValue("@l", book.LibraryId);
                checkCmd.Parameters.AddWithValue("@id", id);

                int count = (int)checkCmd.ExecuteScalar();

                if (count > 0)
                {
                    return -1;
                }

                SqlCommand cmd = new SqlCommand(
                    "UPDATE Books SET Title=@t,Author=@a,Category=@c,Price=@p,LibraryId=@l WHERE BookId=@id",
                    conn);

                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@t", book.Title);
                cmd.Parameters.AddWithValue("@a", book.Author);
                cmd.Parameters.AddWithValue("@c", book.Category);
                cmd.Parameters.AddWithValue("@p", book.Price);
                cmd.Parameters.AddWithValue("@l", book.LibraryId);

                return cmd.ExecuteNonQuery();
            }
            catch
            {
                throw;
            }
        }


        public int DeleteBook(int id)
        {
            try
            {
                using SqlConnection conn = _db.GetConnection();
                conn.Open();

                SqlCommand cmd = new SqlCommand("DELETE FROM Books WHERE BookId=@id", conn);
                cmd.Parameters.AddWithValue("@id", id);

                return cmd.ExecuteNonQuery();
            }
            catch
            {
                throw;
            }
        }
    }
}
