import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../task-service.service';
import { Task } from '../task/task.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Input() task: Partial<Task> = {};
  @Input() isEditMode = false;
  @Output() saveTask = new EventEmitter<Task>();
  router: Router;

  constructor(private taskService: TaskService) {
    this.router=inject(Router);
  }

  saveTaskClicked() {
    if (!this.task.title) return;

    // Validate dueDate is a valid Date object or undefined/null
    if (this.task.dueDate && isNaN(new Date(this.task.dueDate).getTime())) {
      alert('Invalid due date format.');
      return;
    }

    const savedTask: Task = {
      id: this.task.id ?? Date.now(),
      title: this.task.title!,
      description: this.task.description,
      dueDate: this.task.dueDate,
      completed: this.task.completed ?? false
    };

    this.saveTask.emit(savedTask);

    if (!this.isEditMode) {
      this.task = {};  // reset form
    }
  }
}
