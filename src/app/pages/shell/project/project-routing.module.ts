import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project.component';
import { AppPermissions } from '../../../services/app.constants';
import { AuthGuard } from '../../../guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: ProjectComponent,
    children: [], data: { name: '' , permission:AppPermissions.ViewTasks},
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {
}
