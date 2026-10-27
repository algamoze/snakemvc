using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using snakemvc.Models;

namespace snakemvc.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

    public IActionResult Comentarios()
    {
        return View();
    }

    public IActionResult Catalogo()
    {
        return View("~/Views/Catalogo/Catalogo.cshtml");
    }
}

