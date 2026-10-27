using Microsoft.AspNetCore.Mvc;

namespace snakemvc.Controllers
{
    public class AccountController : Controller
    {
        [HttpGet]
        public IActionResult Login() => View();

        [HttpPost]
        public IActionResult Login(string username, string password)
        {
            if (username == "admin" && password == "1234")
                return RedirectToAction("Index", "Home");
            
            ViewBag.Error = "Credenciales incorrectas";
            return View();
        }

        [HttpGet]
        public IActionResult Register() => View();

        [HttpPost]
        public IActionResult Register(string username, string email, string password)
        {
            return RedirectToAction("Login");
        }
    }
}