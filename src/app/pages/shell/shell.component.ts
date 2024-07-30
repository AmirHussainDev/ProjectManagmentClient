import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgZorroAntdModule } from '../../ng-zorro-antd.module';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { Subscription, filter, of } from 'rxjs';
import { Organization, SubOrganization } from '../../services/app.interfact';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppPermissions, SaleStates } from '../../services/app.constants';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ChangePasswordComponent } from './shared-components/change-password/change-password.component';
import { Title } from '@angular/platform-browser';

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
  currentRoutePath: string;
  currentUrl: any;
  currentRoutes: string[] = [];
  saleState = SaleStates;
  appPermissions = AppPermissions;
  currentOrganizationId: number;
  organization: Organization;
  constructor(private userService: UserService,
    private appService: AppService, private fb: FormBuilder,
    private media: MediaMatcher,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private titleService: Title,

  ) {
    this.siteForm = this.fb.group({
      site: []
    })
  }
  ngOnInit() {
    this.loggedInUser = this.userService.getUserDetails();
    this.appService.getSubOrganizations(true);
    this.organization = this.appService.organization;
    this.titleService.setTitle(this.organization.name)
    this.setFavicon(this.organization.icon)
    this.setSitesData();
    this.onSiteChange();
    this.extractRoutePath(this.router.url)
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentUrl = event.url;
      this.extractRoutePath(this.currentUrl)
    });

  }
  setFavicon(base64Icon: string): void {
    const link: HTMLLinkElement = document.querySelector(`link[rel*='icon']`) || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'shortcut icon';
    link.href = base64Icon
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  private extractRoutePath(url: string) {
    url = url.replace(/(https?:\/\/[^\/]+)?\/?/, '');
    this.currentRoutes = url.split(/[/?]/).filter(route => route); // Remove query parameters
    console.log(this.currentRoutes);
  }

  toggleOrganizations() {
    this.showOrganizations = !this.showOrganizations;
  }

  onSiteChange() {
    
    this.siteSubscription = this.siteForm.valueChanges.subscribe(change => {
      this.setCurrentSite(change.site);
    });
    this.subOrgSubscription = this.appService.currentSubOrganization.subscribe(change => {
      if (change && change.id > 0 && this.currentOrganizationId != change.id) {
        this.currentSubOrganization = change;
        this.currentOrganizationId = change.id
      }
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
    this.appService.setSubOrganization({id:0,name:''} as SubOrganization)
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

  isMobile = this.appService.isMobile

  openChangePasswordModal(): void {
    const modal = this.modal.create({
      nzTitle: 'Change Password (' + this.userService.loggedInUser.name + ')',
      nzContent: ChangePasswordComponent,
      nzFooter: null,
      nzData: {
        user: this.userService.loggedInUser
      }
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        console.log('Password changed', result);
      }
    });
  }
}
