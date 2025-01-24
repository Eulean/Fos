using Fos.Models;
using Microsoft.EntityFrameworkCore;

namespace Fos.Data;

public class FosDB : DbContext
{
    public FosDB(DbContextOptions options) : base(options)
    {
        
    }
    
    public DbSet<User> Users { get; set; } = null!;
}