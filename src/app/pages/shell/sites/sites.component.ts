import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { Site } from '../../../services/app.interfact';
import { Subscription } from 'rxjs';
import { SiteStateNames, SiteStates } from '../../../services/app.constants';
import { UserService } from '../../../services/user.service';
import { ExportSheetService } from '../../../services/export-sheet.service';



@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrl: './sites.component.css'
})
export class ProjectsComponent implements OnInit, OnDestroy {
  siteStates = SiteStates
  siteStateNames = SiteStateNames
  expandSet = new Set<number>();
  searchVisible: boolean;
  searchValue: any;
  listOfDisplayData: any[] = [];
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }
  listOfColumn = [
    { title: 'Name',

      compare: (a: any, b: any) => a.name.localeCompare(b.name),
      priority: false,
      width:'100%'
    },
    {
      title: 'Status',
      compare: (a: any, b: any) => a.state.localeCompare(b.state),
      priority: false,    
        width:'auto'

    },
  ];

  clientSubscription: Subscription;
  visible = false;
  sites: any[];
  constructor(private appService: AppService,private userService: UserService,private   exportSheetService: ExportSheetService
  ) {

  }

  ngOnInit(): void {
    this.clientSubscription = this.appService.currentClient.subscribe(change => {
      this.populateSiteData();
    });
  }

  ngOnDestroy(): void {
    if (this.clientSubscription) {
      this.clientSubscription.unsubscribe();
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
    const response = await this.appService.getProjects();
    this.sites = response.filter(site => {
      const siteSupervisors = site.site_supervisors ? JSON.parse(site.site_supervisors) : [];
      return this.userService.loggedInUser.is_admin || !siteSupervisors.length || siteSupervisors.includes(this.userService.loggedInUser.id);
    });
    this.listOfDisplayData = this.sites;
  }

  export(): void {
    const data = this.listOfDisplayData ;
    this.exportSheetService.exportDataToXLSX(data, 'Projects');
  }


  search(): void {
    this.searchVisible = false;
    if (this.searchValue) {
      this.listOfDisplayData = this.sites.filter((item: any) => (item.name && item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1) || (item.owner && item.owner.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1));
      console.log(this.listOfDisplayData)

    } else {
      this.listOfDisplayData = this.sites
    }
  }

}
