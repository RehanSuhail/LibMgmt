using LibMgmtAPI.Interfaces;
using LibMgmtAPI.Models;
using LibMgmtAPI.Data;
using Microsoft.Data.SqlClient;

namespace LibMgmtAPI.Services
{
    public class LibraryManager : ILibraryManager
    {
        private readonly DbHelper _db;

        public LibraryManager(DbHelper db)
        {
            _db = db;
        }

        public List<Library> GetLibraries()
        {
            List<Library> libraries = new List<Library>();

            using SqlConnection conn = _db.GetConnection();
            conn.Open();

            SqlCommand cmd = new SqlCommand("SELECT * FROM Libraries", conn);
            SqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                libraries.Add(new Library
                {
                    LibraryId = (int)reader["LibraryId"],
                    Name = reader["Name"].ToString(),
                    Address = reader["Address"].ToString(),
                    MaximumCapacity = (int)reader["MaximumCapacity"]
                });
            }

            return libraries;
        }

        public Library FindLibraryById(int id)
        {
            using SqlConnection conn = _db.GetConnection();
            conn.Open();

            SqlCommand cmd = new SqlCommand("SELECT * FROM Libraries WHERE LibraryId=@id", conn);
            cmd.Parameters.AddWithValue("@id", id);

            SqlDataReader reader = cmd.ExecuteReader();

            if (reader.Read())
            {
                return new Library
                {
                    LibraryId = (int)reader["LibraryId"],
                    Name = reader["Name"].ToString(),
                    Address = reader["Address"].ToString(),
                    MaximumCapacity = (int)reader["MaximumCapacity"]
                };
            }

            return null;
        }

        public List<Library> FindLibraryByName(string name)
        {
            List<Library> libraries = new List<Library>();

            using SqlConnection conn = _db.GetConnection();
            conn.Open();

            SqlCommand cmd = new SqlCommand(
                "SELECT * FROM Libraries WHERE Name LIKE @name", conn);

            cmd.Parameters.AddWithValue("@name", "%" + name + "%");

            SqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                libraries.Add(new Library
                {
                    LibraryId = (int)reader["LibraryId"],
                    Name = reader["Name"].ToString(),
                    Address = reader["Address"].ToString(),
                    MaximumCapacity = (int)reader["MaximumCapacity"]
                });
            }

            return libraries;
        }


        public int AddLibrary(Library library)
        {
            using SqlConnection conn = _db.GetConnection();
            conn.Open();

            SqlCommand cmd = new SqlCommand(
                "INSERT INTO Libraries (Name,Address,MaximumCapacity) VALUES (@n,@a,@m)", conn);

            cmd.Parameters.AddWithValue("@n", library.Name);
            cmd.Parameters.AddWithValue("@a", library.Address);
            cmd.Parameters.AddWithValue("@m", library.MaximumCapacity);

            return cmd.ExecuteNonQuery();
        }

        public int UpdateLibrary(int id, Library library)
        {
            using SqlConnection conn = _db.GetConnection();
            conn.Open();

            SqlCommand cmd = new SqlCommand(
                "UPDATE Libraries SET Name=@n,Address=@a,MaximumCapacity=@m WHERE LibraryId=@id", conn);

            cmd.Parameters.AddWithValue("@id", id);
            cmd.Parameters.AddWithValue("@n", library.Name);
            cmd.Parameters.AddWithValue("@a", library.Address);
            cmd.Parameters.AddWithValue("@m", library.MaximumCapacity);

            return cmd.ExecuteNonQuery();
        }

        public int DeleteLibrary(int id)
        {
            using SqlConnection conn = _db.GetConnection();
            conn.Open();

            SqlCommand cmd = new SqlCommand("DELETE FROM Libraries WHERE LibraryId=@id", conn);
            cmd.Parameters.AddWithValue("@id", id);

            return cmd.ExecuteNonQuery();
        }
    }
}
