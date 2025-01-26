using System.Data;
using Fos.Data;
using Fos.Models;
using Fos.Services;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Fos.Repository;

public class UserRepository : IUser
{
    private readonly FosDB _db;
    
    public UserRepository(FosDB db)
    {
        _db = db;
    }
    
    public User Create(User user)
    {
        if (user == null)
        {
            throw new ArgumentNullException(nameof(user));
        }

        if (string.IsNullOrEmpty(user.Password))
        {
            throw new ArgumentException("Password cannot be null or empty", nameof(user.Password));
        }

        if (string.IsNullOrEmpty(user.Email))
        {
            throw new ArgumentException("Email cannot be null or empty", nameof(user.Email));
        }

        var existingUser = GetByEmail(user.Email);
        
        if (existingUser != null)
        {
            throw new DuplicateNameException("User already exists");
        }
        
        user.HashedPassword = BCrypt.Net.BCrypt.HashPassword(user.Password);
        
        
        _db.Users.Add(user);
        _db.SaveChanges();

        return user;

    }

    public User? GetById(int id)
    {
        return _db.Users.FirstOrDefault(u => u.Id == id);
    }

    public User? GetByEmail(string email)
    {
        return _db.Users.FirstOrDefault(u => u.Email == email);
    }

    public List<User> GetAll()
    {
        
        // var users = _db.Users.ToList();
        // if (users is null)
        // {
        //     throw new KeyNotFoundException("No Users found");
        // }
        // return users;
        
        return _db.Users.ToList();  // both are same 
    }

    public User? Update(User updateUser)
    {
        if (updateUser is null)
        {
            throw new ArgumentNullException(nameof(updateUser));
        }

        if (string.IsNullOrEmpty(updateUser.Email))
        {
            throw new ArgumentException("Email cannot be null or empty", nameof(updateUser.Email));
        }
        var existingUser = GetByEmail(updateUser.Email);
        if (existingUser is null)
        {
            throw new KeyNotFoundException("User not found");
        }
        
        existingUser.Name = updateUser.Name;
        existingUser.Email = updateUser.Email;

        if (!string.IsNullOrEmpty(updateUser.Password))
        {
            existingUser.Password = updateUser.Password;
            existingUser.HashedPassword = BCrypt.Net.BCrypt.HashPassword(updateUser.Password);
        }

        _db.Users.Update(existingUser);
        _db.SaveChanges();

        return existingUser;
    }

    public void Delete(string email)
    {
        var user = GetByEmail(email);
        if (user == null)
        {
            throw new KeyNotFoundException("User not found");
        }
        _db.Users.Remove(user);
        _db.SaveChanges();
    }
}