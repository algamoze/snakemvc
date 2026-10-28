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
        public string? Badge { get; set; }
        public bool Available { get; set; } = true;
        public List<string> Gallery { get; set; } = new();
    }

    public class ReservaViewModel
    {
        public const decimal PrecioSilla = 80m;
        public const decimal PrecioGps = 100m;
        public const decimal PrecioSeguro = 250m;

        public int ProductId { get; set; }

        [Required(ErrorMessage = "Escribe tu nombre.")]
        [StringLength(80, ErrorMessage = "El nombre es demasiado largo.")]
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

        public bool SillaBebe { get; set; }
        public bool Gps { get; set; }
        public bool SeguroAmplio { get; set; }

        public string? Folio { get; set; }
        public Product? Vehiculo { get; set; }

        public int Dias => Math.Max(0, (FechaFin.Date - FechaInicio.Date).Days);

        public decimal ExtrasPorDia =>
            (SillaBebe ? PrecioSilla : 0) + (Gps ? PrecioGps : 0) + (SeguroAmplio ? PrecioSeguro : 0);

        public decimal Subtotal => Vehiculo == null ? 0 : Dias * Vehiculo.Price;
        public decimal TotalExtras => Dias * ExtrasPorDia;
        public decimal Total => Subtotal + TotalExtras;
    }
}