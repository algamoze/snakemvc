using Microsoft.AspNetCore.Mvc;
using snakemvc.Models;

namespace snakemvc.Controllers
{
    public class CatalogoController : Controller
    {
        // Para agregar más fotos a un auto: Gallery = new() { "~/img/vehiculos/march-2.jpg" }
        private static readonly List<Product> Vehiculos = new()
        {
            new Product { Id = 1, Name = "Nissan March", Price = 600m, Category = "Compacto", Passengers = 5,
                Transmission = "Manual", Badge = "Económico",
                Description = "Auto compacto, ideal para la ciudad. Económico y ágil.",
                ImagePath = "~/img/vehiculos/march.jpg" },
            new Product { Id = 2, Name = "Honda Civic", Price = 1200m, Category = "Sedán", Passengers = 5,
                Transmission = "Automática", Badge = "Más rentado",
                Description = "Sedán cómodo y seguro para viajes. Transmisión automática.",
                ImagePath = "~/img/vehiculos/civic.jpg" },
            new Product { Id = 3, Name = "Toyota RAV4", Price = 1600m, Category = "SUV", Passengers = 5,
                Transmission = "Automática",
                Description = "SUV espaciosa para toda la familia. Excelente rendimiento.",
                ImagePath = "~/img/vehiculos/rav4.jpg" },
            new Product { Id = 4, Name = "BMW Serie 5", Price = 2800m, Category = "Lujo", Passengers = 5,
                Transmission = "Automática", Badge = "Premium",
                Description = "Sedán de lujo. Máxima comodidad, tecnología y potencia.",
                ImagePath = "~/img/vehiculos/serie5.jpg" }
        };

        public IActionResult Catalogo() => View(Vehiculos);

        [HttpGet]
        public IActionResult Detalle(int id)
        {
            var vehiculo = Vehiculos.FirstOrDefault(v => v.Id == id);
            if (vehiculo == null) return NotFound();

            return View(new ReservaViewModel { ProductId = id, Vehiculo = vehiculo });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Detalle(ReservaViewModel modelo)
        {
            var vehiculo = Vehiculos.FirstOrDefault(v => v.Id == modelo.ProductId);
            if (vehiculo == null) return NotFound();
            modelo.Vehiculo = vehiculo;

            if (!vehiculo.Available)
                ModelState.AddModelError(string.Empty, "Este vehículo no está disponible por ahora.");

            if (modelo.FechaInicio.Date < DateTime.Today)
                ModelState.AddModelError(nameof(modelo.FechaInicio), "La recogida no puede ser anterior a hoy.");

            if (modelo.FechaFin.Date <= modelo.FechaInicio.Date)
                ModelState.AddModelError(nameof(modelo.FechaFin), "La devolución debe ser después de la recogida.");
            else if (modelo.Dias > 30)
                ModelState.AddModelError(nameof(modelo.FechaFin), "La renta máxima es de 30 días.");

            if (!ModelState.IsValid) return View(modelo);

            modelo.Folio = $"SR-{DateTime.Now:yyMMdd}-{Random.Shared.Next(1000, 9999)}";
            return View("Confirmacion", modelo);
        }
    }
}