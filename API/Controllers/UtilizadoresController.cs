using API.Data;
using Microsoft.AspNetCore.Mvc;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Helpers;
using System.Text;
using System.Text.RegularExpressions;
using System.IdentityModel.Tokens.Jwt;
using System;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UtilizadoresController : Controller
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public UtilizadoresController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }


        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GettAllUsers()
        {
            var users = await _applicationDbContext.Utilizadores.ToListAsync();

            return Ok(users);
        }


        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] Utilizadores userRequest)
        {
            userRequest.userID = Guid.NewGuid();
            await _applicationDbContext.Utilizadores.AddAsync(userRequest);
            await _applicationDbContext.SaveChangesAsync();

            return Ok(userRequest);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetUser([FromRoute] Guid id)
        {
            var user = await _applicationDbContext.Utilizadores.FirstOrDefaultAsync(x => x.userID == id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }


        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateUser([FromRoute] Guid id, Utilizadores updateUserRequest)
        {
            var user = await _applicationDbContext.Utilizadores.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            user.userNome = updateUserRequest.userNome;
            user.role = updateUserRequest.role;
            user.email = updateUserRequest.email;
            user.telefone = updateUserRequest.telefone;

            await _applicationDbContext.SaveChangesAsync();

            return Ok(user);

        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteUser([FromRoute] Guid id)
        {
            var user = await _applicationDbContext.Utilizadores.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            _applicationDbContext.Utilizadores.Remove(user);
            await _applicationDbContext.SaveChangesAsync();

            return Ok(user);
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] Utilizadores userObj)
        {
            if (userObj == null)
                return BadRequest();

            var user = await _applicationDbContext.Utilizadores
                .FirstOrDefaultAsync(x => x.email == userObj.email);

            if (user == null)
                return NotFound(new { Message = "User não encontrado!" });

            if(!PasswordHasher.VerifyPassword(userObj.password, user.password))
            {
                return BadRequest(new {Message = "Password inválida"});
            }

            user.token = CreateJwt(user);

            return Ok(new
            {
                Token = user.token,
                Message = "Login com sucesso!"
            });

        }


        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] Utilizadores userObj)
        {
            if (userObj == null)
                return BadRequest();

            //Verifica email
            if(await CheckEmailExistAsync(userObj.email))
                return BadRequest(new {Message = "O email já existe!"});

            //Verifica email
            if (await CheckPhoneExistAsync(userObj.telefone))
                return BadRequest(new { Message = "O telefone já existe!" });

            //Verifica password forte
            var pass = CheckPasswordStrength(userObj.password);
            if (!string.IsNullOrEmpty(pass))
                return BadRequest(new { Message = pass.ToString() });


            userObj.password = PasswordHasher.HashPassword(userObj.password);


            var existingUser = await _applicationDbContext.Utilizadores.FirstOrDefaultAsync(x => x.email == userObj.email);
            if (existingUser != null)
                return Conflict(new { Message = "Já existe um usuário com este email." });


            if (userObj.role == "Gestor Projeto")
                userObj.role = "Gestor Projeto";
            else if (userObj.role == "Programador")
                userObj.role = "Programador";
            else
                return BadRequest(new { Message = "Tipo de usuário inválido." });

            await _applicationDbContext.Utilizadores.AddAsync(userObj);
            await _applicationDbContext.SaveChangesAsync();

            return Ok(new
            {
                Message = "User registado!"
            });

        }


        private Task<bool> CheckEmailExistAsync(string email)
            => _applicationDbContext.Utilizadores.AnyAsync(x => x.email == email);


        private Task<bool> CheckPhoneExistAsync(string telefone)
            => _applicationDbContext.Utilizadores.AnyAsync(x => x.telefone == telefone);

        private string CheckPasswordStrength(string password)
        {
            StringBuilder sb = new StringBuilder();

            if (password.Length < 8)
                sb.Append("A passowrd deve ter pelo menos 8 caracteres" + Environment.NewLine);
            if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]")
                && Regex.IsMatch(password, "[0-9]")))
                sb.Append("A password deve ser alfanumérica" + Environment.NewLine);
            if(!Regex.IsMatch(password, "[<,>,@,!,#,$,%,^,&,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,-,=]"))
                sb.Append("A password deve conter caracteres especiais" + Environment.NewLine);
            return sb.ToString();

        }

        private string CreateJwt(Utilizadores user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysecret......");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, user.role),
                new Claim(ClaimTypes.Email, $"{user.email}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);

            return jwtTokenHandler.WriteToken(token);

        }


        


    }
}
