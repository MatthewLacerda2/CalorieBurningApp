using Newtonsoft.Json;

namespace CalorieBurningApp.Server.Models;

public class LoginRequest
{

    [JsonProperty]
    public string? Email;

    [JsonProperty]
    public string? Password;

}