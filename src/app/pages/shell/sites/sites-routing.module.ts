import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SitesComponent } from './sites.component';
import { SiteContractorsComponent } from './site-contractors/site-contractors.component';
import { SiteContractComponent } from './site-contract/site-contract.component';
import { SiteComponent } from './site/site.component';

const routes: Routes = [
  {
    path: '', component: SitesComponent,
    data:{name:'All Sites'}
  },
  {
    path: ':siteId', component: SiteComponent,
    data:{name:'Site'}
  },
  {
    path: ':siteId/contract/:contractId', component: SiteContractComponent,
    data:{name:'Create Contract'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitesRoutingModule {
}
