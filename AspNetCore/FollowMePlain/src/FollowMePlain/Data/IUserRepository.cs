using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace FollowMePlain.Data {
    public interface IUserRepository {
        IEnumerable<User> GetUsers();

        User GetById(ObjectId id);

        User Login(string username, string password);

        void Add(User speaker);

        void Update(User speaker);

        bool Remove(ObjectId id);
        void SeedData();
    }
}
