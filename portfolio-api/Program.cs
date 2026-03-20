var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddScoped<portfolio_api.Services.EmailService>();
builder.Services.AddCors(opt =>
    opt.AddPolicy("AllowFrontend", p =>
        p.WithOrigins(builder.Configuration["AllowedOrigin"] ?? "*")
         .AllowAnyHeader()
         .AllowAnyMethod()));

var app = builder.Build();
app.UseCors("AllowFrontend");
app.MapControllers();
app.Run();
