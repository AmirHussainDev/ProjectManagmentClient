import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { HttpParams } from '@angular/common/http';
import { InvoiceStateNames, POStates } from '../../../services/app.constants';


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit, AfterViewInit, OnDestroy {
  apiUrl = environment.apiUrl;
  pendingInvoices: any[] = [];
  saleRequests:any[]=[];
  stateNames = InvoiceStateNames
  paymentConfirmations: any[] = [];
  states = POStates;
  partialPayments: any[] = []
  subOrgSubscription: Subscription;
  tabs = ['Purchase Request', 'Purchase Returns', 'Sale Requests', 'Sale Return'];
  constructor(private appService: AppService) { }
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

  loadSaleDataFromServer(
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
    this.getAndSetSaleRequests(params);

  }

  onPurchaseQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadPurchaseDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }
  onSaleQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadSaleDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }
  ngOnInit(): void {
    this.subOrgSubscription = this.appService.currentSubOrganization.subscribe(change => {
      this.loadPurchaseDataFromServer();
      this.loadSaleDataFromServer();
    });
  }
  ngOnDestroy(): void {
    if (this.subOrgSubscription) { this.subOrgSubscription.unsubscribe() }
  }
  ngAfterViewInit(): void {
  }

  async getAndSetPurchaseOrders(params: HttpParams) {
    this.pendingInvoices = await this.appService.retirevePOByState(params)
    this.loading = false;
    this.total = this.pendingInvoices.length; // mock the total data here
  }


  async getAndSetSaleRequests(params: HttpParams) {
    this.loading = true;
    this.saleRequests = await this.appService.retireveSaleByState(params)
    this.loading = false;
    this.total = this.pendingInvoices.length; // mock the total data here
  }


}