using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FollowMePlain.Data;
using Microsoft.AspNet.Mvc;
using MongoDB.Bson;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace FollowMePlain.Controllers
{
    [Route("api/blogapi")]
    public class BlogApiController : Controller
    {
        private readonly IBlogRepository _blogRepository;

        public BlogApiController(IBlogRepository blogRepository) {
            _blogRepository = blogRepository;
        }

        [HttpGet,Route("getBlogItems")]
        public IEnumerable<BlogItem> Get() {
            return _blogRepository.AllSpeakers();
        }

        [HttpGet("deleteBlogItem/{id}")]
        public bool DeleteBlogItem(string id) {
            var objId=new ObjectId(id);
            return _blogRepository.Remove(objId);
        }

        [HttpPost,Route("createBlogItem")]
        public void CreateBlogItem([FromBody]BlogItem blogItem) {
            blogItem.FollowDate=DateTime.Now;
            _blogRepository.Add(blogItem);
        }
    }
}
