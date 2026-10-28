using Microsoft.AspNetCore.Mvc;
using snakemvc.Models;

namespace snakemvc.Controllers
{
    public class AccountController : Controller
    {
        [HttpGet]
        public IActionResult Login() => View(new LoginViewModel());

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Login(LoginViewModel modelo)
        {
            if (!ModelState.IsValid) return View(modelo);

            // Credenciales de prueba. Más adelante se cambia por ASP.NET Identity.
            if (modelo.Username == "admin" && modelo.Password == "1234")
                return RedirectToAction("Index", "Home");

            ModelState.AddModelError(string.Empty, "Usuario o contraseña incorrectos.");
            return View(modelo);
        }

        [HttpGet]
        public IActionResult Register() => View(new RegisterViewModel());

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Register(RegisterViewModel modelo)
        {
            if (!ModelState.IsValid) return View(modelo);

            // Aquí todavía no se guarda el usuario (falta la base de datos).
            TempData["Mensaje"] = "Cuenta creada. Ahora puedes iniciar sesión.";
            return RedirectToAction(nameof(Login));
        }
    }
}