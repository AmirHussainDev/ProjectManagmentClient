import { Component, TemplateRef } from '@angular/core';
import { SaleStates, SaleStateNames, StatusIcons } from '../../../../services/app.constants';
import { AppService } from '../../../../services/app.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ExportSheetService } from '../../../../services/export-sheet.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  saleRequests: any[] = [];
  showSide = false;
  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  states = SaleStates;
  stateNames = SaleStateNames;
  filterStates = Object.keys(SaleStateNames).map((res: any) => ({ text: SaleStateNames[res], value: res }))
  clientSubscription: Subscription;
  status = '';
  currentOrganizationId = 0;
  searchVisible = false;
  searchValue = '';
  listOfDisplayData: any[] = [];
  suffixIconSearch: string | TemplateRef<void> | undefined;
  sort: { key: string; value: import("ng-zorro-antd/table").NzTableSortOrder; }[];
  statusIcons = StatusIcons;
  constructor(
    private appService: AppService,
    private media: MediaMatcher,
    private route: ActivatedRoute,
    private router: Router,
    private exportSheetService:ExportSheetService
  ) { }
  export(): void {
    const data = this.listOfDisplayData ;
    this.exportSheetService.exportDataToXLSX(data, 'Sale Requests');
  }
  ngOnInit(): void {
    this.clientSubscription = this.appService.currentClient.subscribe(change => {
      if (change && change.id > 0 && this.currentOrganizationId != change.id) {
        if (this.currentOrganizationId) {
          this.router.navigate(['/', 'task', 'sales'], {
            queryParams: {
              'SALE': null,
            },
            queryParamsHandling: 'merge'
          })
        }
        this.currentOrganizationId = change.id;
        this.route.queryParams.subscribe(async (params) => {
          // Use this queryParams object to load data

          if (!params['SALE']) {
            this.showSide = false
            this.loadSaleDataFromServer();

          } else {
            this.showSide = true
          }
          // Do something with the query parameters
          this.status = params['status'];
          if (this.status) {
            this.loadSaleDataFromServer();
            this.showSide = false;
          }
        });
      }
    });
  }
  ngOnDestroy(): void {
    if (this.clientSubscription) { this.clientSubscription.unsubscribe() }
  }
  ngAfterViewInit(): void {
  }
  async getAndSetSaleRequests(params: HttpParams) {
    this.loading = true;
    this.saleRequests = await this.appService.retireveSaleByState(params)
    this.loading = false;
    this.listOfDisplayData = this.saleRequests;

    this.total = this.saleRequests.length; // mock the total data here
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
    if ((!filters || !filters.length) && this.status && parseInt(this.status) !== this.states.Quote) {
      params = params.append('state', this.status);
    }
    this.getAndSetSaleRequests(params);

  }
  getInitials(name: string): string {
    if (!name) return '';
    const initials = name.split(' ').map(word => word[0]).join('');
    return initials.toUpperCase();
  }
  onSaleQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    if (this.sort && this.appService.areArraysDifferent(this.sort, sort)) {
      this.sort = sort;
      this.listOfDisplayData = this.appService.sortDataArray(this.listOfDisplayData, this.sort)
      return;
    }
    this.sort = sort;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadSaleDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  isMobile = this.appService.isMobile


  openDetails() {
    this.showSide = true
  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.searchVisible = false;
    if (this.searchValue) {
      this.listOfDisplayData = this.saleRequests.filter((item: any) => (item.title && item.title.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1));
      console.log(this.listOfDisplayData)

    } else {
      this.listOfDisplayData = this.saleRequests
    }
  }
}
