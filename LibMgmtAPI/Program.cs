using LibMgmtAPI.Data;
using LibMgmtAPI.Interfaces;
using LibMgmtAPI.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<DbHelper>();
builder.Services.AddScoped<IBookManager, BookManager>();
builder.Services.AddScoped<ILibraryManager, LibraryManager>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAngularApp");

app.UseAuthorization();
app.MapControllers();
app.Run();
