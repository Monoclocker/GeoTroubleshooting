using System.Security.Cryptography;
using System.Text;

namespace Backend.External.Utils
{
    public class Hasher
    {
        public static string ComputeHash(string input)
        {
            SHA256 sha = SHA256.Create();

            byte[] stringBytes = Encoding.UTF8.GetBytes(input);

            byte[] hashBytes = sha.ComputeHash(stringBytes);

            string hashedString = Encoding.UTF8.GetString(hashBytes);

            return hashedString;

        }
    }
}
