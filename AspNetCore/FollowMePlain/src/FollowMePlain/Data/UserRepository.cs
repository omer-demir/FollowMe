using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;

namespace FollowMePlain.Data
{
    public class UserRepository:IUserRepository
    {
        private readonly IMongoDatabase _database;

        public UserRepository() {
            _database = GetDatabase();
        }

        #region Implementation of IUserRepository

        public IEnumerable<User> GetUsers() {
            throw new NotImplementedException();
        }

        public User GetById(ObjectId id) {
            throw new NotImplementedException();
        }

        public User Login(string username, string password) {
            var collection = _database.GetCollection<User>("Users");
            var predicate = Builders<User>.Filter.And(new List<FilterDefinition<User>>() {
                new ExpressionFilterDefinition<User>(a=>a.Username==username),
                new ExpressionFilterDefinition<User>(a=>a.Password==password)
            });

            var user = collection.FindAsync(predicate).Result.ToListAsync().Result.FirstOrDefault();
            return user;
        }

        public void Add(User speaker) {
            var collection = _database.GetCollection<User>("Users");
            collection.InsertOneAsync(speaker);
        }

        public void Update(User speaker) {
            throw new NotImplementedException();
        }

        public bool Remove(ObjectId id) {
            throw new NotImplementedException();
        }

        public void SeedData() {
            throw new NotImplementedException();
        }

        #endregion

        private IMongoDatabase GetDatabase() {
            var client = new MongoClient();
            var database = client.GetDatabase("FollowMeDb");
            return database;
        }
    }
}
