import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SitesComponent } from './sites.component';
import { SiteContractorsComponent } from './site-contractors/site-contractors.component';
import { SiteContractComponent } from './site-contract/site-contract.component';
import { SiteComponent } from './site/site.component';
import { AppPermissions } from '../../../services/app.constants';
import { AuthGuard } from '../../../guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: SitesComponent,
    data:{name:'All Sites', permission:AppPermissions.ManageSites},
    canActivate:[AuthGuard]
  },
  {
    path: ':siteId', component: SiteComponent,
    data:{name:'Site', permission:AppPermissions.AddSites},
    canActivate:[AuthGuard]
  },
  {
    path: ':siteId/contract/:contractId', component: SiteContractComponent,
    data:{name:'Create Contract', permission:AppPermissions.ManageSiteContract},
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitesRoutingModule {
}
