import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { TaskService } from '../task-service.service';
import { Task, TaskComponent } from './task/task.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskComponent, TaskFormComponent,MatIconModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  editingTask: Task | null = null;
  private router = inject(Router);

  constructor(private taskService: TaskService) {
    this.taskService= inject(TaskService)
  }

  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks();
  }

  onTaskSaved(updatedTask: Task) {
    if (updatedTask.id) {
      this.taskService.editTask(updatedTask);
    } else {
      this.taskService.addTask(updatedTask);
    }
    this.editingTask = null;
  }

  onEditTask(task: Task) {
    this.editingTask = { ...task };
  }

  onDeleteTask(task: Task) {
    this.taskService.removeTask(task.id);
    if (this.editingTask?.id === task.id) {
      this.editingTask = null;
    }
  }

  AddTask() {
    this.router.navigate(['addTask']);
  }
}
