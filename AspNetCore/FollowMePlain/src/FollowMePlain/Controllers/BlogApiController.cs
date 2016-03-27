using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FollowMePlain.Data;
using Microsoft.AspNet.Mvc;

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

        // GET: api/values
        [HttpGet,Route("getBlogItems")]
        public IEnumerable<BlogItem> Get() {
            return _blogRepository.AllSpeakers();
        }
    }
}
