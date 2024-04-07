import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { RolePermissionsComponent } from './role-permissions/role-permissions.component';

const routes: Routes = [
  {
    path: '', component: UsersComponent,
    data:{name:'Users'}

  }, {
    path: 'roles', component: RolePermissionsComponent,
    data: { name: 'Roles' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule {
}
