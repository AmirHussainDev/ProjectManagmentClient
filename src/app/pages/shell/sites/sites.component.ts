import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { Site } from '../../../services/app.interfact';



@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrl: './sites.component.css'
})
export class SitesComponent implements OnInit {
  listOfColumn = [
    {
      title: 'id'
    },
    {
      title: 'Name',
    },
  ];


  visible = false;
  sites: any[];
  constructor(private appService: AppService) {

  }

  ngOnInit(): void {
    this.populateSiteData();
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
