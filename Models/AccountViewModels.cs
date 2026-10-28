using System.ComponentModel.DataAnnotations;

namespace snakemvc.Models
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Escribe tu usuario.")]
        public string? Username { get; set; }

        [Required(ErrorMessage = "Escribe tu contraseña.")]
        [DataType(DataType.Password)]
        public string? Password { get; set; }
    }

    public class RegisterViewModel
    {
        [Required(ErrorMessage = "Elige un nombre de usuario.")]
        [StringLength(30, MinimumLength = 3, ErrorMessage = "Debe tener entre 3 y 30 caracteres.")]
        public string? Username { get; set; }

        [Required(ErrorMessage = "Escribe tu correo.")]
        [EmailAddress(ErrorMessage = "El correo no es válido.")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Crea una contraseña.")]
        [StringLength(100, MinimumLength = 8, ErrorMessage = "La contraseña debe tener al menos 8 caracteres.")]
        [DataType(DataType.Password)]
        public string? Password { get; set; }

        [Required(ErrorMessage = "Confirma tu contraseña.")]
        [DataType(DataType.Password)]
        [Compare(nameof(Password), ErrorMessage = "Las contraseñas no coinciden.")]
        public string? ConfirmPassword { get; set; }
    }
}