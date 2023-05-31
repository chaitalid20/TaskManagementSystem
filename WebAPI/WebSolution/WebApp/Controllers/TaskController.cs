using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Models;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class TaskController : Controller
    {
        private readonly DataContext _context;

        public TaskController(DataContext datacontext)
        {
            this._context = datacontext;
        }

        //Get All Task
        [HttpGet]
        public async Task<ActionResult<IList<Tasks>>> GetAllTask()
        {
            var tasks = await _context.Tasks.ToListAsync();
            return Ok(tasks);
        }

        //Get single Task
        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetOneTask")]
        public async Task<IActionResult> GetOneTask([FromRoute]int id)
        {
            var tasks = await _context.Tasks.FirstOrDefaultAsync(x => x.Id == id);
            if (tasks != null)
            {
                return Ok(tasks);
            }
            return NotFound("Task not Found");
        }

        //Create new card
        [HttpPost]
        public async Task<IActionResult> AddTask([FromBody] Tasks task)
        {
            task.CreatedOn = DateTime.UtcNow;
            await _context.Tasks.AddAsync(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOneTask), new {id= task.Id}, task);

        }

        //upadte task
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateTask([FromRoute] int id, [FromBody] Tasks task)
        {
            var existingTask = await _context.Tasks.FirstOrDefaultAsync(x => x.Id == id);
            if(existingTask != null)
            {
                existingTask.Priority = task.Priority;
                existingTask.Status = task.Status;
                existingTask.TaskName = task.TaskName;
                existingTask.TaskDescription = task.TaskDescription;
                existingTask.UpdatedOn = DateTime.Now;
                await _context.SaveChangesAsync();
                return Ok(existingTask);
            }
            return NotFound("Task not Found");

        }

        //Delete task
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteTask([FromRoute] int id)
        {
            var existingTask = await _context.Tasks.FirstOrDefaultAsync(x => x.Id == id);
            if (existingTask != null)
            {
                _context.Remove(existingTask);
                await _context.SaveChangesAsync();
                return Ok(existingTask);
            }
            return NotFound("Task not Found");

        }
    }
}