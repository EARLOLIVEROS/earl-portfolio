using Microsoft.AspNetCore.Mvc;
using portfolio_api.Models;
using portfolio_api.Services;

namespace portfolio_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly EmailService _email;

    public ContactController(EmailService email) => _email = email;

    [HttpPost]
    public async Task<IActionResult> Send([FromBody] ContactMessage msg)
    {
        if (string.IsNullOrWhiteSpace(msg.Name) ||
            string.IsNullOrWhiteSpace(msg.Email) ||
            string.IsNullOrWhiteSpace(msg.Message))
            return BadRequest(new { error = "All fields are required." });

        await _email.SendAsync(msg.Name, msg.Email, msg.Message);
        return Ok(new { success = true, message = "Message sent successfully!" });
    }
}