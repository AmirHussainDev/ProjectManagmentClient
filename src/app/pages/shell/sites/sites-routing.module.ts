import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './sites.component';
import { SiteContractorsComponent } from './site-contractors/site-contractors.component';
import { SiteContractComponent } from './site-contract/site-contract.component';
import { SiteComponent } from './site/site.component';
import { AppPermissions } from '../../../services/app.constants';
import { AuthGuard } from '../../../guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: ProjectsComponent,
    data:{name:'All Projects', permission:AppPermissions.AddUpdateTask},
    canActivate:[AuthGuard]
  },
  {
    path: ':siteId', component: SiteComponent,
    data:{name:'Site', permission:AppPermissions.AddUpdateTask},
    canActivate:[AuthGuard]
  },
  {
    path: ':siteId/contract/:contractId', component: SiteContractComponent,
    data:{name:'Create Contract', permission:AppPermissions.UpdateClientContract},
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {
}
