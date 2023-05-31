using System;
using Microsoft.EntityFrameworkCore;
using WebApp.Models;

namespace WebApp.Data
{
	public class DataContext : DbContext
	{
		public DataContext(DbContextOptions options): base(options)
		{
		}
		public DbSet<User> user { get; set; }
		public DbSet<TaskDetails> taskDetails { get; set; }
        public DbSet<Tasks> Tasks { get; set; }
    }
}

