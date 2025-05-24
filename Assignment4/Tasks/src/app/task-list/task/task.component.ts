import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { TaskService } from '../../task-service.service';
@Component({
  selector: 'app-task',
  imports: [MatCardModule, MatCheckboxModule, FormsModule, CommonModule, MatChipsModule, MatIconModule, MatButtonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  errorMsg: string | null = null;

  constructor(private taskService: TaskService) {}

  onEditClick() {
    this.edit.emit();
  }
  onDeleteClick() {
    this.delete.emit();
  }
  onCompletedChange() {
    try {
      this.taskService.editTask(this.task);
      this.errorMsg = null;
    } catch (err: any) {
      this.errorMsg = err.message || 'Failed to update task.';
    }
  }
}
export interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
}
