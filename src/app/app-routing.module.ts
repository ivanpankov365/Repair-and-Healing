import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminBranchComponent }   from './admin-branch/admin-branch.component';
import { MasterBranchComponent }      from './master-branch/master-branch.component';
import { NewTaskComponent }  from './new-task/new-task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { NewMasterComponent } from './new-master/new-master.component'
import {MasterTaskListComponent} from './master-task-list/master-task-list.component';

const routes: Routes = [
 /* { path: '', redirectTo: '/newtask', pathMatch: 'full' },*/
  { path: 'adminbranch', component: AdminBranchComponent,
    children: [
      { path: 'tasklist', component: TaskListComponent },
      { path: 'newmaster', component: NewMasterComponent }
    ]
  },
  { path: 'masterbranch', component: MasterBranchComponent/*,
    children: [
      { path: 'mastertasklist', component: MasterTaskListComponent }
    ]*/
  },
  { path: 'newtask', component: NewTaskComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
