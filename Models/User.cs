using System.ComponentModel.DataAnnotations;

namespace Fos.Models;

public class User
{
    [Key]
    public int Id { get; set; }
    public string? Name { get; set; }
    [EmailAddress]
    public string? Email { get; set; }
    [MinLength(3)]
    public string? Password { get; set; }
    public string? HashedPassword { get; set; }
}