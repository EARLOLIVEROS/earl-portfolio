using MailKit.Net.Smtp;
using MimeKit;

namespace portfolio_api.Services;

public class EmailService
{
    private readonly IConfiguration _config;

    public EmailService(IConfiguration config) => _config = config;

    public async Task SendAsync(string fromName, string fromEmail, string message)
    {
        var email = new MimeMessage();
        email.From.Add(new MailboxAddress("Portfolio Contact", _config["Smtp:From"] ?? ""));
        email.To.Add(MailboxAddress.Parse(_config["Smtp:To"] ?? ""));
        email.Subject = $"Portfolio message from {fromName}";
        email.Body = new TextPart("plain")
        {
            Text = $"From: {fromName} <{fromEmail}>\n\n{message}"
        };

        using var smtp = new SmtpClient();
        await smtp.ConnectAsync(_config["Smtp:Host"], 587, false);
        await smtp.AuthenticateAsync(_config["Smtp:User"], _config["Smtp:Pass"]);
        await smtp.SendAsync(email);
        await smtp.DisconnectAsync(true);
    }
}