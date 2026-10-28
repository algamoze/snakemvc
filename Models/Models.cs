using System.ComponentModel.DataAnnotations;

namespace snakemvc.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public string? ImagePath { get; set; }
        public string? Category { get; set; }
        public int Passengers { get; set; }
        public string? Transmission { get; set; }
    }

    public class ReservaViewModel
    {
        public int ProductId { get; set; }

        [Required(ErrorMessage = "Escribe tu nombre.")]
        [StringLength(80)]
        public string? Nombre { get; set; }

        [Required(ErrorMessage = "Escribe tu correo.")]
        [EmailAddress(ErrorMessage = "El correo no es válido.")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Elige la fecha de recogida.")]
        [DataType(DataType.Date)]
        public DateTime FechaInicio { get; set; } = DateTime.Today.AddDays(1);

        [Required(ErrorMessage = "Elige la fecha de devolución.")]
        [DataType(DataType.Date)]
        public DateTime FechaFin { get; set; } = DateTime.Today.AddDays(4);

        public Product? Vehiculo { get; set; }

        public int Dias => (FechaFin.Date - FechaInicio.Date).Days;
        public decimal Total => Vehiculo == null ? 0 : Dias * Vehiculo.Price;
    }
}