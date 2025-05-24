import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './task-list/add-task/add-task.component';

export const routes: Routes = [
    {path:'',pathMatch:'prefix',redirectTo:'tasks'},
    {path:'tasks',pathMatch:'prefix',component:TaskListComponent},
    {path:'addTask',pathMatch:'prefix',component:AddTaskComponent},  
];
