import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateService } from 'src/services/create.service';
import { interval, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit{
[x: string]: any;

  createForm!: FormGroup;
  message! : string;

  constructor(
    private formBuilder: FormBuilder,
    private _service: CreateService,
    private router: Router){
  }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      taskName:['', Validators.required],
      taskDescription: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required]
    });
  }



onSubmit(): void {
if(this.createForm.invalid){
  return;
}
else{

  this._service.createTask(this.createForm.value).subscribe(response => {
    console.log(response);
  });
  this.message = "Task Created Sucessfully!"
  this.router.navigate(['dashboard']);
}
    // Process checkout data here
    //this.items = this.cartService.clearCart();
    //console.warn('Your order has been submitted', this.checkoutForm.value);
    //this.checkoutForm.reset();
  }

}
