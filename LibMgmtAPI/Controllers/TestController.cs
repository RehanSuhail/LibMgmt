using Microsoft.AspNetCore.Mvc;
using LibMgmtAPI.Data;
using Microsoft.Data.SqlClient;

namespace LibMgmtAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        private readonly DbHelper _db;

        public TestController(DbHelper db)
        {
            _db = db;
        }

        [HttpGet("dbtest")]
        public IActionResult TestDatabase()
        {
            try
            {
                using SqlConnection conn = _db.GetConnection();
                conn.Open();
                return Ok("Database connection successful!");
            }
            catch (SqlException ex)
            {
                return StatusCode(500, "SQL Error: " + ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "General Error: " + ex.Message);
            }
        }
    }
}
