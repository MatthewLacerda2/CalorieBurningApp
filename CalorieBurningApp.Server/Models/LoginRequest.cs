using Newtonsoft.Json;

namespace CalorieBurningApp.Server.Models;

public class LoginRequest
{

    [JsonProperty]
    public string? UserName;

    [JsonProperty]
    public string? Password;

}