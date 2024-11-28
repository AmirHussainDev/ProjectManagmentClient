import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { environment } from '../../../../../environments/environment';
import { Subscription } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { HttpParams } from '@angular/common/http';
import { AppPermissions, TaskCardColors, TaskColors, TaskSeverity, TaskSeverityColors, TaskStateNames, TaskStates, TaskStatesConnectivity, TaskTypeColors } from '../../../../services/app.constants';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ExportSheetService } from '../../../../services/export-sheet.service';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, AfterViewInit, OnDestroy {
  apiUrl = environment.apiUrl;
  @ViewChild('actionSetting', { static: true }) actionSetting!: TemplateRef<any>;
  @ViewChild('actionEdit', { static: true }) actionEdit!: TemplateRef<any>;
  @ViewChild('actionEllipsis', { static: true }) actionEllipsis!: TemplateRef<any>;

  pendingInvoices: any[] = [];
  stateNames = TaskStateNames
  paymentConfirmations: any[] = [];
  states = TaskStates;
  stateColors = TaskColors;
  stateCardColors = TaskCardColors;
  taskTypeColors = TaskTypeColors;
  taskTypeIcons = TaskTypeColors;
  taskSeverity = TaskSeverity;
  taskSeverityColors = TaskSeverityColors;
  partialPayments: any[] = []
  clientSubscription: Subscription;
  showSide = false;
  searchVisible = false;
  searchValue = ''
  tabs = ['Task Request', 'Task Returns', 'Sale Requests', 'Sale Return'];
  listOfDisplayData: any = {};
  currentOrganizationId: number;
  sort: { key: string; value: import("ng-zorro-antd/table").NzTableSortOrder; }[];
  taskStatesConnectivity = TaskStatesConnectivity;
  appPermissions=AppPermissions;
  constructor(
    private appService: AppService,
    private media: MediaMatcher,
    private route: ActivatedRoute,
    private router: Router,
    private exportSheetService: ExportSheetService

  ) { }
  getActions(item: any): TemplateRef<any>[] {
    return [
      this.createActionTemplate(this.actionSetting, item),
      this.createActionTemplate(this.actionEdit, item),
      this.createActionTemplate(this.actionEllipsis, item),
    ];
  }
  
  createActionTemplate(template: TemplateRef<any>, item: any): TemplateRef<any> {
    return {
      ...template,
      context: { item }, // Bind the item to the template context
    } as any;
  }
  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  filterStates = Object.keys(TaskStateNames).map((res: any) => ({ text: TaskStateNames[res], value: res }))

  groupByState(items: any[]) {
    const mappedResults = items.reduce((result, item) => {
      // Check if the state already exists in the result
      if (!result[item.state]) {
        // If not, initialize it with an empty array
        result[item.state] = [];
      }

      // Add the current item to the state's array
      result[item.state].push(item);

      return result;
    }, {} as { [key: number]: any[] });
    Object.keys(this.states).forEach((key) => {
      const keypairs: any = this.states
      const value = keypairs[key];
      if (!mappedResults[value]) {
        mappedResults[value] = []
      }
    })
    return mappedResults
  }
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

  title = 'angular-drag-drop-tutorial';
  todo: any = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  sortByValue = (a: any, b: any): number => {
    if (a.value < b.value) {
      return -1;
    } else if (a.value > b.value) {
      return 1;
    } else {
      return 0;
    }
  };
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      // Reorder items within the same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Move items between lists
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateDetails((event.container.data[event.currentIndex] as any).id, (TaskStates as any)[event.container.id])
    }
  }
  async updateDetails(id: number, state: number) {

    const body: any = {
      id,
      state
    }
    const response: any = await this.appService.updateTaskRequest(body)
  }

  onTaskQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    if (this.sort && this.appService.areArraysDifferent(this.sort, sort)) {
      this.sort = sort;
      this.listOfDisplayData = this.groupByState(this.appService.sortDataArray(this.listOfDisplayData, this.sort))
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
    const data = this.listOfDisplayData;

    this.exportSheetService.exportDataToXLSX(data, 'Task Request');
  }

  ngOnInit(): void {
    this.clientSubscription = this.appService.currentClient.subscribe(change => {
      if (change && change.id > 0 && this.currentOrganizationId != change.id) {
        if (this.currentOrganizationId) {
          this.router.navigate(['/', 'task', 'board'], {
            queryParams: {
              'TASK': null,
            },
            queryParamsHandling: 'merge'
          })
        }
        this.currentOrganizationId = change.id;
        this.showSide = false;
        this.route.queryParams.subscribe(async (params) => {
          this.onTaskQueryParamsChange({
            pageIndex: 0,
            pageSize: 0,
            sort: [],
            filter: []
          })
          if (!params['TASK']) {
            this.showSide = false;
           
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
    this.listOfDisplayData = this.groupByState([...this.pendingInvoices]);

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

  actionSettingTemplate(item: any) {
    return { item };
  }

  actionEditTemplate(item: any) {
    return { item };
  }

  actionEllipsisTemplate(item: any) {
    return { item };
  }
}

