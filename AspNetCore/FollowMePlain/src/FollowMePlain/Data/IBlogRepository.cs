using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace FollowMePlain.Data
{
    public interface IBlogRepository
    {
        IEnumerable<BlogItem> AllSpeakers();

        BlogItem GetById(ObjectId id);

        void Add(BlogItem speaker);

        void Update(BlogItem speaker);

        bool Remove(ObjectId id);
        void SeedData();
    }
}
