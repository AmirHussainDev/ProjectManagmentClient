import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { RolePermissionsComponent } from './role-permissions/role-permissions.component';
import { AppPermissions } from '../../../services/app.constants';
import { AuthGuard } from '../../../guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: UsersComponent,
    data:{name:'Users', permission:AppPermissions.ManageUsers},
    canActivate:[AuthGuard]

  }, {
    path: 'roles', component: RolePermissionsComponent,
    data: { name: 'Roles', permission:AppPermissions.ViewPermissions},
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule {
}
