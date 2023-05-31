using System;
namespace WebApp.Models
{
    public class User
    {
        public int UserID { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string EmailID { get; set; }
        public bool Active
        {
            get; set;
        }
    }
}

