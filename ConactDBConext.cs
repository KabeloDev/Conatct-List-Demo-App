using ContactApp.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace ContactApp.Data
{
    public class ContactDBConext : DbContext
    {
        public ContactDBConext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Contact> Contacts { get; set; }
    }
}
