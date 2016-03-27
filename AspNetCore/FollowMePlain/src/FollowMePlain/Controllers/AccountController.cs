using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FollowMePlain.Data;
using FollowMePlain.Model;
using Microsoft.AspNet.Authentication.Cookies;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace FollowMePlain.Controllers {
    public class AccountController : Controller {
        private readonly IUserRepository _userRepository;

        public AccountController(IUserRepository userRepository) {
            _userRepository = userRepository;
        }

        [AllowAnonymous]
        public IActionResult Login() {
            return View();
        }

        [HttpPost,AllowAnonymous]
        public IActionResult Login(UserLoginModel loginModel) {

            var result = _userRepository.Login(loginModel.Username, loginModel.Pass);
            if (result != null) {
                
                var claimPrincipal=new ClaimsPrincipal(new List<ClaimsIdentity> {
                    new ClaimsIdentity(new List<Claim> {
                        new Claim(ClaimTypes.Name,result.Username),
                        new Claim(ClaimTypes.Email,result.Email),
                    },CookieAuthenticationDefaults.AuthenticationScheme)
                });

                HttpContext.Authentication.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimPrincipal);

                return RedirectToAction("Index", "Home");
            }
            return RedirectToAction("Login", "Account");
        }

        public IActionResult Logout() {
            HttpContext.Authentication.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login", "Account");
        }

        [AllowAnonymous]
        public IActionResult Forbidden() {
            return View();
        }

        [AllowAnonymous]
        public IActionResult Register() {
            return View();
        }

        [HttpPost,AllowAnonymous]
        public IActionResult Register(User model) {
            model.CreateDate = DateTime.Now;

            _userRepository.Add(model);
            var claimPrincipal = new ClaimsPrincipal(new List<ClaimsIdentity> {
                    new ClaimsIdentity(new List<Claim> {
                        new Claim(ClaimTypes.Name,model.Username),
                        new Claim(ClaimTypes.Email,model.Email),
                    },CookieAuthenticationDefaults.AuthenticationScheme)
                });

            HttpContext.Authentication.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimPrincipal);

            return RedirectToAction("Index", "Home");
        }
    }
}
