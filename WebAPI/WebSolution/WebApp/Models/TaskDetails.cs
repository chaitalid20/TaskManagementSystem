﻿using System;
using System.ComponentModel.DataAnnotations;

namespace WebApp.Models
{
	public class TaskDetails
	{
        [Key]
		public Guid Id { get; set; }

        public string TaskName { get; set; }

        public string TaskDescription { get; set; }

        public string Status { get; set; }

        public string Priority { get; set; }

        public string? CreatedBy { get; set; }

        public DateTime? CreatedOn { get; set; }

        public string ?UpdatedBy { get; set; }

        public DateTime? UpdatedOn { get; set; }
    }
}

