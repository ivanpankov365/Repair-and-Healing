import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { NewTaskComponent } from './new-task/new-task.component';
import { AdminBranchComponent } from './admin-branch/admin-branch.component';
import { TaskListComponent } from './task-list/task-list.component';
import { MasterListComponent } from './master-list/master-list.component';
import { MasterBranchComponent } from './master-branch/master-branch.component';
import { MasterTaskListComponent } from './master-task-list/master-task-list.component';
import { NewMasterComponent } from './new-master/new-master.component';
import { TestAuthComponent } from './test-auth/test-auth.component';

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule],
    declarations: [ AppComponent, NewTaskComponent, AdminBranchComponent, TaskListComponent, MasterListComponent, MasterBranchComponent, MasterTaskListComponent, NewMasterComponent, TestAuthComponent],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
