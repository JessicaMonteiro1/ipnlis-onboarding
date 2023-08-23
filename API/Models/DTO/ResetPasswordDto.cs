
using Microsoft.AspNetCore.Identity;
using System;
using System.Globalization;

namespace API.Models.DTO
{
    public class ResetPasswordDto
    {
        public string Email { get; set; }
        public string EmailToken { get; set; }
        public string NewPassword { get; set; }
        public String ConfirmPassword { get; set; }
    }
}
