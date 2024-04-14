import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgZorroAntdModule } from '../../ng-zorro-antd.module';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { Subscription, of } from 'rxjs';
import { SubOrganization } from '../../services/app.interfact';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css'
})
export class ShellComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  isMobileDevice = true;
  loggedInUser: any = {};
  sites: any[] = [];
  site: any = {};
  siteForm: FormGroup;
  showOrganizations = false;
  siteSubscription: Subscription;
  subOrgSubscription: Subscription;
  currentSubOrganization: SubOrganization
  constructor(private userService: UserService,
    private appService: AppService, private fb: FormBuilder,
    private media: MediaMatcher
    ) {
    this.siteForm = this.fb.group({
      site: []
    })
  }
  ngOnInit() {
    this.loggedInUser = this.userService.getUserDetails();
    this.setSitesData();
    this.onSiteChange();
  }

  toggleOrganizations() {
    this.showOrganizations = !this.showOrganizations;
  }

  onSiteChange() {
    this.siteSubscription = this.siteForm.valueChanges.subscribe(change => {
      this.setCurrentSite(change.site);
    });
    this.subOrgSubscription = this.appService.currentSubOrganization.subscribe(change => {
      this.currentSubOrganization = change;
    });
  }

  async setSitesData() {
    const resp: any = await this.appService.getAndSetSites();
    const sitesData = resp && resp.length ? resp.map((site: any) => { return { label: site.name, ...site } }) : [];
    this.sites = [...sitesData];
    this.appService.setSites(this.sites);
    this.siteForm.patchValue({ site: this.sites[0] })
    this.setCurrentSite(undefined);
  }

  setCurrentSite(site: any) {
    this.appService.setCurrentSite(site || this.sites[0]);
  }

  logout() {
    this.userService.logout()
  }

  ngOnDestroy() {
    if (this.siteSubscription) { this.siteSubscription.unsubscribe() }
    if (this.subOrgSubscription) { this.subOrgSubscription.unsubscribe() }
  }

  getUserInitials(name: string): string {
    const nameArray = name.trim().split(' '); // Split the name into an array of words
    const initials = nameArray.map(word => word.charAt(0)); // Extract the first character of each word
    return initials.join('').toUpperCase(); // Join the characters and convert to uppercase
}

isMobile(): boolean {
  const isMobile = this.media.matchMedia('(max-width: 600px)');
  return isMobile.matches;
}
}
