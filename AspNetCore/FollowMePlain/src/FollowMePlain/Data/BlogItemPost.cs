using System;
using MongoDB.Bson;

namespace FollowMePlain.Data {
    public class BlogItemPost {
        public ObjectId Id { get; set; }
        public int BlogItemId { get; set; }
        public string Url { get; set; }
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string ImageUrl { get; set; }
        public DateTime? CreateDate { get; set; }
    }
}