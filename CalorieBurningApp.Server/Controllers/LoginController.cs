using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using CalorieBurningApp.Server.Models;
using System.Security.Claims;

namespace CalorieBurningApp.Server.Controllers;

[ApiController]
[Route("api/v1/login")]
public class LoginController : ControllerBase
{

    private readonly SignInManager<User> _signInManager;
    private readonly UserManager<User> _userManager;
    private readonly IConfiguration _configuration;

    public LoginController(SignInManager<User> signInManager, UserManager<User> userManager, IConfiguration configuration)
    {
        _signInManager = signInManager;
        _userManager = userManager;
        _configuration = configuration;
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginRequest model)
    {

        model.UserName = "lendacerda";
        model.Password = "@Xpvista7810";

        if (string.IsNullOrEmpty(model.UserName) || string.IsNullOrEmpty(model.Password))
        {
            return BadRequest("Invalid UserName or Password. Username: " + model.UserName + " , " + model.Password);
        }
        Console.WriteLine("chegou aqui2");
        var result = await _signInManager.PasswordSignInAsync(model.UserName, model.Password, true, false);
        Console.WriteLine("chegou aqui");

        if (result.Succeeded)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            var token = GenerateToken(user!);       //This is line 48
            Console.WriteLine("SUCESSO");
            return Ok(new { token });
        }
        Console.WriteLine("FRACASSO");
        return Unauthorized();
    }

    private string GenerateToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF32.GetBytes(_configuration["Jwt:SecretKey"]!);   //This is line 59

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, user.UserName!),
                new Claim(ClaimTypes.Email, user.Email!)
            }),
            Expires = DateTime.UtcNow.AddMinutes(20),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}