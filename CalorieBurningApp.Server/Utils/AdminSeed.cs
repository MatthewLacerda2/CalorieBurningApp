using CalorieBurningApp.Server.Models;
using Microsoft.AspNetCore.Identity;
using Server.Data;

namespace CalorieBurningApp.Server.Utils;

public class AdminSeed
{
    private readonly ServerContext context;
    private readonly UserManager<User> userManager;
    private readonly RoleManager<IdentityRole> roleManager;

    public AdminSeed(ServerContext _context, UserManager<User> _userManager, RoleManager<IdentityRole> _roleManager)
    {
        context = _context;
        userManager = _userManager;
        roleManager = _roleManager;
    }

    public async Task SeedUsersAsync()
    {
        string roleName = "Admin";

        var roleExist = await roleManager.RoleExistsAsync(roleName);
        if (!roleExist)
        {
            await roleManager.CreateAsync(new IdentityRole(roleName));
        }

        var anyUser = await userManager.GetUsersInRoleAsync(roleName);

        if (!anyUser.Any())
        {
            var AdminUser = new User("Admin", DateOnly.FromDateTime(DateTime.Now), "admin_dictator", "admin@gmail.com", "9515550123");
            await userManager.CreateAsync(AdminUser, "@Xpvista7810");
            await userManager.AddToRoleAsync(AdminUser, roleName);

            Streak streak = new Streak(AdminUser.Id, AdminUser.UserName!, AdminUser.FullName);
            context.Streaks.Add(streak);

            await context.SaveChangesAsync();
        }
    }
}