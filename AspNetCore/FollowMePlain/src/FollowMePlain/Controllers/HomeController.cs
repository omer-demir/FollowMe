using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FollowMePlain.Data;
using Microsoft.AspNet.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace FollowMePlain.Controllers
{
    public class HomeController : Controller
    {
        private readonly IBlogRepository _blogRepository;

        public HomeController(IBlogRepository blogRepository) {
            _blogRepository = blogRepository;
        }

        // GET: /<controller>/
        public IActionResult Index() {
            return View();
        }
    }
}
