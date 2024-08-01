import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { HttpParams } from '@angular/common/http';
import { InvoiceStateNames, POStates } from '../../../services/app.constants';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute, Route, Router } from '@angular/router';


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit, AfterViewInit, OnDestroy {
  apiUrl = environment.apiUrl;
  pendingInvoices: any[] = [];
  stateNames = InvoiceStateNames
  paymentConfirmations: any[] = [];
  states = POStates;
  partialPayments: any[] = []
  subOrgSubscription: Subscription;
  showSide = false;
  searchVisible = false;
  searchValue = ''
  tabs = ['Purchase Request', 'Purchase Returns', 'Sale Requests', 'Sale Return'];
  listOfDisplayData: any[] = [];
  currentOrganizationId: number;
  sort: { key: string; value: import("ng-zorro-antd/table").NzTableSortOrder; }[];
  
  constructor(
    private appService: AppService,
    private media: MediaMatcher,
    private route: ActivatedRoute,
    private router: Router,

  ) { }
  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  filterStates = Object.keys(InvoiceStateNames).map((res: any) => ({ text: InvoiceStateNames[res], value: res }))


  loadPurchaseDataFromServer(
    pageIndex: number = 1,
    pageSize: number = 1000,
    sortField: string | null = 'id',
    sortOrder: string | null = 'asc',
    filters: Array<{ key: string; value: string[] }> = []
  ): void {
    this.loading = true;
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`)
      .append('sortField', `${sortField}`)
      .append('sortOrder', `${sortOrder}`);
    filters.forEach(filter => {
      filter.value.forEach(value => {
        params = params.append(filter.key, value);
      });
    });
    this.getAndSetPurchaseOrders(params);

  }


  onPurchaseQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    if (this.sort && this.appService.areArraysDifferent(this.sort, sort)) {
      this.sort = sort;
      this.listOfDisplayData=this.appService.sortDataArray(this.listOfDisplayData,this.sort)
      return;
    }
    this.sort = sort;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadPurchaseDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  getInitials(name: string): string {
    if (!name) return '';
    const initials = name.split(' ').map(word => word[0]).join('');
    return initials.toUpperCase();
  }
  
  ngOnInit(): void {
    this.subOrgSubscription = this.appService.currentSubOrganization.subscribe(change => {
      if (change && change.id > 0 && this.currentOrganizationId != change.id) {
        if (this.currentOrganizationId) {
          this.router.navigate(['/', 'purchase'], {
            queryParams: {
              'PO': null,
            },
            queryParamsHandling: 'merge'
          })
        }
        this.currentOrganizationId = change.id;
        this.showSide = false;
        this.route.queryParams.subscribe(async (params) => {
          if (!params['PO']) {
            this.showSide = false;
            this.onPurchaseQueryParamsChange({
              pageIndex: 0,
              pageSize: 0,
              sort: [],
              filter: []
            })
          } else {
            this.showSide = true
          }

        });
      }
    });
  }
  ngOnDestroy(): void {
    if (this.subOrgSubscription) { this.subOrgSubscription.unsubscribe() }
  }
  ngAfterViewInit(): void {
  }

  async getAndSetPurchaseOrders(params: HttpParams) {
    this.pendingInvoices = await this.appService.retirevePOByState(params)
    this.listOfDisplayData = [...this.pendingInvoices];

    this.loading = false;
    this.total = this.pendingInvoices.length; // mock the total data here
  }



  isMobile = this.appService.isMobile


  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.searchVisible = false;
    if (this.searchValue) {
      this.listOfDisplayData = this.pendingInvoices.filter((item: any) => (item.subject && item.subject.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1) || (item.vendor_name && item.vendor_name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1));
      console.log(this.listOfDisplayData)

    } else {
      this.listOfDisplayData = this.pendingInvoices
    }
  }
}