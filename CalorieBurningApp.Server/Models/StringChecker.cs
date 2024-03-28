using System.Text.RegularExpressions;

public static class StringChecker {

    static Regex uppercaseRegex = new Regex(@"[A-Z]");
    static Regex lowercaseRegex = new Regex(@"[a-z]");
    static Regex digitRegex = new Regex(@"[0-9]");
    static Regex specialCharRegex = new Regex(@"[^A-Za-z0-9]");

    public static bool IsPasswordStrong(string password) {

        bool hasUppercase = uppercaseRegex.IsMatch(password);
        bool hasLowercase = lowercaseRegex.IsMatch(password);
        bool hasDigit = digitRegex.IsMatch(password);
        bool hasSpecialChar = specialCharRegex.IsMatch(password);

        return hasUppercase && hasLowercase && hasDigit && hasSpecialChar;
    }

    public static bool HasNoLettersOrSpaces(string entry) {
        
        Regex noLetterOrSpaceRegex = new Regex(@"^[^A-Za-z\s]+$");

        return noLetterOrSpaceRegex.IsMatch(entry);
    }
}