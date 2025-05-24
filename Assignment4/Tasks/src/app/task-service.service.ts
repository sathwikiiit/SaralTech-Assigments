import { Injectable } from '@angular/core';
import { Task } from './task-list/task/task.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Sample Task',
      description: 'This is a sample task.',
      dueDate: new Date(),
      completed: false
    }
  ];

  private tasksSubject = new BehaviorSubject<Task[]>([...this.tasks]);

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(newTask: Task): void {
    newTask.id = this.generateNextId();
    this.tasks.push({ ...newTask });
    this.tasksSubject.next(this.tasks)
  }

  editTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index > -1) {
      this.tasks[index] = { ...updatedTask };
    }
    this.tasksSubject.next(this.tasks)
  }

  removeTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksSubject.next(this.tasks)
  }

  private generateNextId(): number {
    return this.tasks.length ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
  }
}
