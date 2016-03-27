using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace FollowMePlain.Data
{
    public class BlogItem
    {
        public ObjectId Id { get; set; }
        public string Url { get; set; }
        public string Name { get; set; }
        public string RssFeedLink { get; set; }
        public DateTime? FollowDate { get; set; }
        public List<BlogItemPost> BlogItemPosts { get; set; }
    }
}
