using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;

namespace FollowMePlain.Data {
    public class BlogRepository : IBlogRepository {
        private readonly IMongoDatabase _database;

        public BlogRepository() {
            _database = GetDatabase();
        }

        #region Implementation of IBlogRepository

        public IEnumerable<BlogItem> AllSpeakers() {
            var filterDefinition = new BsonDocument();

            return _database.GetCollection<BlogItem>("BlogItems").FindAsync(filterDefinition).Result.ToListAsync().Result;
        }

        public BlogItem GetById(ObjectId id) {
            throw new NotImplementedException();
        }

        public void Add(BlogItem speaker) {
            _database.GetCollection<BlogItem>("BlogItems").InsertOneAsync(speaker);
        }

        public void Update(BlogItem speaker) {
            throw new NotImplementedException();
        }

        public bool Remove(ObjectId id) {
            var blogCollection = _database.GetCollection<BlogItem>("BlogItems");
            var predicate = Builders<BlogItem>.Filter.Eq(a => a.Id, id);
            return blogCollection.DeleteOneAsync(predicate).Result.DeletedCount > 0;
        }

        public void SeedData() {
            var collection = _database.GetCollection<BlogItem>("BlogItems");

            collection.InsertManyAsync(new List<BlogItem> {
                new BlogItem {
                    FollowDate = DateTime.Now,
                    Name = "John Papa",
                    Url = "http://johnpapa.net/",
                    RssFeedLink = "http://crossorigin.me/http://johnpapa.net/feed.xml",
                    BlogItemPosts = new List<BlogItemPost> {
                        new BlogItemPost {
                            Url = "http://johnpapa.net/es5-es2015-typescript/",
                            CreateDate = DateTime.Now,
                            ShortDescription = "What is the difference between ES5, ES2015 (formerly known as ES6), and TypeScript? Which should we learn and use?",
                            Title = "Understanding ES5, ES2015 and TypeScript"
                        },
                        new BlogItemPost {
                            Url = "http://johnpapa.net/angular-2-first-look/",
                            CreateDate = DateTime.Now.AddDays(-2),
                            ShortDescription = "My Angular 2 First Look course is now available on Pluralsight.",
                            Title = "Angular 2 First Look"
                        },
                    }
                },new BlogItem {
                    FollowDate = DateTime.Now,
                    Name = "Scott Allen",
                    Url = "http://odetocode.com/",
                    RssFeedLink = "http://crossorigin.me/http://feeds.feedburner.com/odeToCode",
                    BlogItemPosts = new List<BlogItemPost> {
                        new BlogItemPost {
                            Url = "http://odetocode.com/blogs/scott/archive/2016/03/22/play-by-play-with-jon-skeet-and-rob-conery.aspx",
                            CreateDate = DateTime.Now,
                            ShortDescription = "Play by Play with Jon Skeet and Rob Conery",
                            Title = "Play by Play with Jon Skeet and Rob Conery"
                        },
                        new BlogItemPost {
                            Url = "http://odetocode.com/blogs/scott/archive/2016/03/21/reusing-javascript-template-literals.aspx",
                            CreateDate = DateTime.Now.AddDays(-2),
                            ShortDescription = "Reusing JavaScript Template Literals",
                            Title = "Reusing JavaScript Template Literals"
                        },
                    }
                },new BlogItem {
                    FollowDate = DateTime.Now,
                    Name = "Scott Guthrie",
                    Url = "https://weblogs.asp.net/scottgu",
                    RssFeedLink = "http://crossorigin.me/https://weblogs.asp.net/scottgu/rss?containerid=13",
                    BlogItemPosts = new List<BlogItemPost> {
                        new BlogItemPost {
                            Url = "https://weblogs.asp.net/scottgu/welcoming-the-xamarin-team-to-microsoft",
                            CreateDate = DateTime.Now,
                            ShortDescription = "Welcoming the Xamarin team to Microsoft",
                            Title = "Welcoming the Xamarin team to Microsoft"
                        },
                        new BlogItemPost {
                            Url = "https://weblogs.asp.net/scottgu/azurecon-keynote-announcements-india-regions-gpu-support-iot-suite-container-service-and-security-center",
                            CreateDate = DateTime.Now.AddDays(-2),
                            ShortDescription = "AzureCon Keynote Announcements",
                            Title = "AzureCon Keynote Announcements"
                        },
                    }
                }

            });

        }

        #endregion

        private IMongoDatabase GetDatabase() {
            var client = new MongoClient();
            var database = client.GetDatabase("FollowMeDb");
            return database;
        }
    }
}
