using Microsoft.AspNetCore.Mvc;
using snakemvc.Models;
using System.Collections.Generic;

namespace snakemvc.Controllers
{
    public class CatalogoController : Controller
    {
        public IActionResult Catalogo()
        {
            var vehiculos = new List<Product>
            {
                new Product { Id = 1, Name = "Nissan March", Price = 600.00m, Description = "Auto compacto, ideal para la ciudad. Económico y ágil.", ImagePath = "~/img/vehiculos/march.jpg" },
                new Product { Id = 2, Name = "Honda Civic", Price = 1200.00m, Description = "Sedán cómodo y seguro para viajes. Transmisión automática.", ImagePath = "~/img/vehiculos/civic.jpg" },
                new Product { Id = 3, Name = "Toyota RAV4", Price = 1600.00m, Description = "SUV espaciosa para toda la familia. Excelente rendimiento.", ImagePath = "~/img/vehiculos/rav4.jpg" },
                new Product { Id = 4, Name = "BMW Serie 5", Price = 2800.00m, Description = "Sedán de lujo. Máxima comodidad, tecnología y potencia.", ImagePath = "~/img/vehiculos/serie5.jpg" }
            };

            return View(vehiculos);
        }
    }
}