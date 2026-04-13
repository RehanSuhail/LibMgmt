using Microsoft.AspNetCore.Mvc;
using LibMgmtAPI.Interfaces;
using LibMgmtAPI.Models;

namespace LibMgmtAPI.Controllers
{
    [ApiController]
    [Route("api/book")]
    public class BookController : ControllerBase
    {
        private readonly IBookManager _manager;

        public BookController(IBookManager manager)
        {
            _manager = manager;
        }

[HttpGet("getallbooks")]
public IActionResult GetAllBooks()
{
    try
    {
        return Ok(_manager.GetBooks());
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.Message);
    }
}


        [HttpGet("getbookbyid/{id}")]
        public IActionResult GetBookById(int id)
        {
            try
            {
                var book = _manager.FindBookById(id);
                if (book == null) return NotFound("Book not found");
                return Ok(book);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("findbookbyname/{name}")]
        public IActionResult FindBookByName(string name)
        {
            try
            {
                if (string.IsNullOrEmpty(name))
                    return BadRequest("Name cannot be empty");

                var books = _manager.FindBookByName(name);

                if (books == null || books.Count == 0)
                    return NotFound("Book not found");

                return Ok(books);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpPost("addbook")]
        public IActionResult AddBook(Book book)
        {
            try
            {
                if (string.IsNullOrEmpty(book.Title))
                    return BadRequest("Title is required");

                if (book.Price <= 0)
                    return BadRequest("Price must be greater than 0");

                if (book.LibraryId <= 0)
                    return BadRequest("LibraryId must be valid");

                int result = _manager.AddBook(book);

                if (result == -1)
                    return Conflict("Duplicate book exists in this library");

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpPut("updatebook/{id}")]
        public IActionResult UpdateBook(int id, Book book)
        {
            try
            {
                if (id <= 0) return BadRequest("Invalid Id");

                int result = _manager.UpdateBook(id, book);

                if (result == -1)
                    return Conflict("Duplicate book exists in this library");

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpDelete("deletebook/{id}")]
        public IActionResult DeleteBook(int id)
        {
            try
            {
                if (id <= 0) return BadRequest("Invalid Id");

                _manager.DeleteBook(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
