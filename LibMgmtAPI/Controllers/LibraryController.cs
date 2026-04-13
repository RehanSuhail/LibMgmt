using Microsoft.AspNetCore.Mvc;
using LibMgmtAPI.Interfaces;
using LibMgmtAPI.Models;

namespace LibMgmtAPI.Controllers
{
    [ApiController]
    [Route("api/library")]
    public class LibraryController : ControllerBase
    {
        private readonly ILibraryManager _manager;

        public LibraryController(ILibraryManager manager)
        {
            _manager = manager;
        }

        [HttpGet("getalllibraries")]
        public IActionResult GetAllLibraries()
        {
            try
            {
                return Ok(_manager.GetLibraries());
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("getlibrarybyid/{id}")]
        public IActionResult GetLibraryById(int id)
        {
            try
            {
                if (id <= 0) return BadRequest("Invalid Library Id");

                var library = _manager.FindLibraryById(id);
                if (library == null) return NotFound("Library not found");

                return Ok(library);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("findlibrarybyname/{name}")]
        public IActionResult FindLibraryByName(string name)
        {
            try
            {
                if (string.IsNullOrEmpty(name))
                    return BadRequest("Library name cannot be empty");

                var libraries = _manager.FindLibraryByName(name);

                if (libraries == null || libraries.Count == 0)
                    return NotFound("Library not found");

                return Ok(libraries);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }



        [HttpPost("addlibrary")]
        public IActionResult AddLibrary(Library library)
        {
            try
            {
                if (string.IsNullOrEmpty(library.Name))
                    return BadRequest("Library name is required");

                if (string.IsNullOrEmpty(library.Address))
                    return BadRequest("Address is required");

                if (library.MaximumCapacity <= 0)
                    return BadRequest("MaximumCapacity must be greater than 0");

                _manager.AddLibrary(library);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpPut("updatelibrary/{id}")]
        public IActionResult UpdateLibrary(int id, Library library)
        {
            try
            {
                if (id <= 0)
                    return BadRequest("Invalid Library Id");

                _manager.UpdateLibrary(id, library);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpDelete("deletelibrary/{id}")]
        public IActionResult DeleteLibrary(int id)
        {
            _manager.DeleteLibrary(id);
            return Ok();
        }
    }
}
