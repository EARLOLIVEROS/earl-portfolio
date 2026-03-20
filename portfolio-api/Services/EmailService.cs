using SendGrid;
using SendGrid.Helpers.Mail;

namespace portfolio_api.Services;

public class EmailService
{
    private readonly IConfiguration _config;
    public EmailService(IConfiguration config) => _config = config;

    public async Task SendAsync(string fromName, string fromEmail, string message)
    {
        var client = new SendGridClient(_config["SendGrid:ApiKey"]);
        var msg = new SendGridMessage
        {
            From = new EmailAddress(_config["SendGrid:From"] ?? "", "Portfolio Contact"),
            Subject = $"Portfolio message from {fromName}",
            PlainTextContent = $"From: {fromName} <{fromEmail}>\n\n{message}"
        };
        msg.AddTo(new EmailAddress(_config["SendGrid:To"] ?? ""));
        await client.SendEmailAsync(msg);
    }
}