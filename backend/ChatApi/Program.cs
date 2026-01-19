using ChatApi.Hubs;
using ChatApi.SignalR.RateLimiting;
using Microsoft.AspNetCore.SignalR;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<SignalRRateLimiter>(); // singleton, persist user rate

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddSignalR(options =>
{
    // global filters
    options.AddFilter<RateLimitHubFilter>();
});

var envOrigins = Environment.GetEnvironmentVariable("PRODUCTION_URL");

var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>()
    ?? [];

if (allowedOrigins.Length == 0)
    throw new InvalidOperationException("No CORS origins configured");

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy
                .WithOrigins(
                    allowedOrigins
                )
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        }
    );
});




var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapHub<ChatHub>("/hub");

app.MapControllers();

app.Run();
