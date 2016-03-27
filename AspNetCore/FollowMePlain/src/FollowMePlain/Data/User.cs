using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace FollowMePlain.Data
{
    public class User
    {
        public ObjectId Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime? CreateDate { get; set; }
        public List<BlogItem> BlogItems { get; set; }
    }
}
