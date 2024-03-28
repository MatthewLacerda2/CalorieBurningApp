using Newtonsoft.Json;

namespace CalorieBurningApp.Server.Models;

public class LoginRequest
{

    [JsonProperty]
    public string? UserName { get; set; }

    [JsonProperty]
    public string? Password { get; set; }

}