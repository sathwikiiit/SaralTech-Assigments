import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../task/task.component';
import { TaskFormComponent } from "../task-form/task-form.component";
import { TaskService } from '../../task-service.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-task',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    TaskFormComponent
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  @Output() taskCreated = new EventEmitter<Task>();
  constructor(private taskService: TaskService, private router: Router) {}

  onTaskSaved(task: Task) {
    // Validate dueDate is a valid Date object or undefined/null
    if (task.dueDate && isNaN(new Date(task.dueDate).getTime())) {
      // Optionally, show an error (could use a snackbar or similar in real app)
      alert('Invalid due date format.');
      return;
    }
    this.taskService.addTask(task);
    this.router.navigate(['tasks']);
  }
}
