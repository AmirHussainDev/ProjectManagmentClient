import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { HttpParams } from '@angular/common/http';
import { TaskStateNames, TaskStates } from '../../../services/app.constants';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ExportSheetService } from '../../../services/export-sheet.service';


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit, AfterViewInit, OnDestroy {
  apiUrl = environment.apiUrl;
  pendingInvoices: any[] = [];
  stateNames = TaskStateNames
  paymentConfirmations: any[] = [];
  states = TaskStates;
  partialPayments: any[] = []
  clientSubscription: Subscription;
  showSide = false;
  searchVisible = false;
  searchValue = ''
  tabs = ['Task Request', 'Task Returns', 'Sale Requests', 'Sale Return'];
  listOfDisplayData: any[] = [];
  currentOrganizationId: number;
  sort: { key: string; value: import("ng-zorro-antd/table").NzTableSortOrder; }[];
  
  constructor(
    private appService: AppService,
    private media: MediaMatcher,
    private route: ActivatedRoute,
    private router: Router,
    private exportSheetService:ExportSheetService

  ) { }
  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  filterStates = Object.keys(TaskStateNames).map((res: any) => ({ text: TaskStateNames[res], value: res }))


  loadTaskDataFromServer(
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
    this.getAndSetTaskOrders(params);

  }


  onTaskQueryParamsChange(params: NzTableQueryParams): void {
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
    this.loadTaskDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  getInitials(name: string): string {
    if (!name) return '';
    const initials = name.split(' ').map(word => word[0]).join('');
    return initials.toUpperCase();
  }
  
  export(): void {
    const data = this.listOfDisplayData ;

    this.exportSheetService.exportDataToXLSX(data, 'Task Request');
  }

  ngOnInit(): void {
    this.clientSubscription = this.appService.currentClient.subscribe(change => {
      if (change && change.id > 0 && this.currentOrganizationId != change.id) {
        if (this.currentOrganizationId) {
          this.router.navigate(['/', 'task','list'], {
            queryParams: {
              'TASK': null,
            },
            queryParamsHandling: 'merge'
          })
        }
        this.currentOrganizationId = change.id;
        this.showSide = false;
        this.route.queryParams.subscribe(async (params) => {
          if (!params['TASK']) {
            this.showSide = false;
            this.onTaskQueryParamsChange({
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
    if (this.clientSubscription) { this.clientSubscription.unsubscribe() }
  }
  ngAfterViewInit(): void {
  }

  async getAndSetTaskOrders(params: HttpParams) {
    this.pendingInvoices = await this.appService.retireveTaskByState(params)
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
      this.listOfDisplayData = this.pendingInvoices.filter((item: any) => (item.title && item.title.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1) || (item.project_name && item.project_name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1));
      console.log(this.listOfDisplayData)

    } else {
      this.listOfDisplayData = this.pendingInvoices
    }
  }
}