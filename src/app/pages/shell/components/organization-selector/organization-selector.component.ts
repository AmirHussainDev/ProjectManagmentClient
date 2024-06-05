import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubOrganization } from '../../../../services/app.interfact';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-organization-selector',
  templateUrl: './organization-selector.component.html',
  styleUrl: './organization-selector.component.css'
})
export class OrganizationSelectorComponent implements OnInit {
  loading = false;
  data: SubOrganization[] = []
  @Input() visible = false;
  @Output() closeDrawer = new EventEmitter<boolean>();
  constructor(private appService: AppService) {

  }

  ngOnInit(): void {
    this.getAndSetSubOrganizations();
  }

  close() {
    this.closeDrawer.emit(true);
  }
  async getAndSetSubOrganizations() {
    this.loading = true;
    this.data = await this.appService.getSubOrganizations(true);
    this.loading = false;
  }

  setSubOrganization(item: SubOrganization) {
    this.appService.setSubOrganization(item);
    localStorage.setItem('selectedOrganzation',JSON.stringify(item))
    this.closeDrawer.emit(true)
  }
}
