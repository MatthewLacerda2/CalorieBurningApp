using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using CalorieBurningApp.Server.Models;
using System.Security.Claims;
using Server.Data;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;

namespace CalorieBurningApp.Server.Controllers;

[ApiController]
[Route("api/v1/login")]
public class LoginController : ControllerBase
{

    private readonly SignInManager<User> _signInManager;
    private readonly UserManager<User> _userManager;
    private readonly IConfiguration _configuration;
    private readonly ServerContext _context;

    public LoginController(SignInManager<User> signInManager, UserManager<User> userManager, IConfiguration configuration, ServerContext context)
    {
        _signInManager = signInManager;
        _userManager = userManager;
        _configuration = configuration;
        _context = context;
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginRequest model)
    {

        if (string.IsNullOrEmpty(model.UserName) || string.IsNullOrEmpty(model.Password))
        {
            return BadRequest("Invalid UserName or Password. Username: " + model.UserName + " , " + model.Password);
        }

        var result = await _signInManager.PasswordSignInAsync(model.UserName, model.Password, true, false);

        if (result.Succeeded)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            var token = GenerateToken(user!);

            user!.lastLogin = DateTime.Now;
            _context.SaveChanges();

            return Ok(new { token });
        }

        return Unauthorized();
    }

    private string GenerateToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF32.GetBytes(_configuration["Jwt:SecretKey"]!);

        var UserDTOJson = JsonConvert.SerializeObject((UserDTO)user);

        var claims = new List<Claim>{
            new Claim(ClaimTypes.Name, user.UserName!),
            new Claim(ClaimTypes.Email, user.Email!),
            new Claim("UserDTO",UserDTOJson)
        };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(20),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout()
    {
        try
        {
            await _signInManager.SignOutAsync();
            return Ok("Logged out successfully");
        }
        catch (Exception ex)
        {
            Console.WriteLine("\nErro Message: " + ex.Message + "\nErro Data: " + ex.Data);
            return StatusCode(StatusCodes.Status500InternalServerError, "Error logging out");
        }
    }
}