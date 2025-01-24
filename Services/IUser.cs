using Fos.Models;

namespace Fos.Services;

public interface IUser
{
    User Create(User user);
    User? GetById(int id);
    User? GetByEmail(string email);
    List<User> GetAll();
    User? Update(User user);
    void Delete(string email);
}