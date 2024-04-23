import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { Site } from '../../../services/app.interfact';
import { Subscription } from 'rxjs';
import { SiteStateNames, SiteStates } from '../../../services/app.constants';



@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrl: './sites.component.css'
})
export class SitesComponent implements OnInit, OnDestroy {
  siteStates=SiteStates
  siteStateNames=SiteStateNames
  expandSet = new Set<number>();
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }
  listOfColumn = [
    {
      title: 'id'
    },
    {
      title: 'Name',
    },
  ];

  subOrgSubscription:Subscription;
  visible = false;
  sites: any[];
  constructor(private appService: AppService) {

  }

  ngOnInit(): void {
    this.subOrgSubscription = this.appService.currentSubOrganization.subscribe(change => {
      this.populateSiteData();
    });
  }

  ngOnDestroy(): void {
    if(this.subOrgSubscription){
      this.subOrgSubscription.unsubscribe();
    }
  }


  open(): void {
    this.visible = true;
  }

  close(refresh = false): void {
    this.visible = false;
    if (refresh) {
      this.populateSiteData();
    }
  }

  async populateSiteData() {
    this.sites = await this.appService.getSites();

  }

}
