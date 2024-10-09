import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { environment } from '../../../../../environments/environment';
import { Subscription } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { HttpParams } from '@angular/common/http';
import { TaskCardColors, TaskColors, TaskStateNames, TaskStates, TaskStatesConnectivity, TaskTypeColors } from '../../../../services/app.constants';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ExportSheetService } from '../../../../services/export-sheet.service';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import * as Highcharts from 'highcharts';
import HighchartsGantt from 'highcharts/modules/gantt';

import more from 'highcharts/highcharts-more';
more(Highcharts);

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, AfterViewInit, OnDestroy {
  apiUrl = environment.apiUrl;
  pendingInvoices: any[] = [];
  stateNames = TaskStateNames;
  chartConstructor: string = 'chart';
  Highcharts: typeof Highcharts = Highcharts;

  paymentConfirmations: any[] = [];
  states = TaskStates;
  stateColors = TaskColors;
  stateCardColors = TaskCardColors;
  taskTypeColors = TaskTypeColors;
  partialPayments: any[] = []
  clientSubscription: Subscription;
  showSide = false;
  searchVisible = false;
  searchValue = ''
  tabs = ['Task Request', 'Task Returns', 'Sale Requests', 'Sale Return'];
  listOfDisplayData: any = {};
  currentOrganizationId: number;
  sort: { key: string; value: import("ng-zorro-antd/table").NzTableSortOrder; }[];
  taskStatesConnectivity = TaskStatesConnectivity
  ganttChartOptions: Highcharts.Options = {};
  showChart=false;
  constructor(
    private appService: AppService,
    private media: MediaMatcher,
    private route: ActivatedRoute,
    private router: Router,
    private exportSheetService: ExportSheetService

  ) {         HighchartsGantt(Highcharts);
  }
  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  filterStates = Object.keys(TaskStateNames).map((res: any) => ({ text: TaskStateNames[res], value: res }))
  createGanttChart() {

    const ganttData = this.pendingInvoices.map(task => ({
        name: task.task_no,
        start: new Date(task.start_date).getTime(),
        end: new Date(task.due_date).getTime()
    }));
    const handleTaskClick = (task: { name: any; }) => {
      this.router.navigate(['/', 'task', 'report','task'], {
        queryParams: {
          'PO': task.name,
        },
        queryParamsHandling: 'merge'
      });
    this.showSide=true
  };

    this.ganttChartOptions = {
        chart: {
            type: 'gantt',
            height: 400
        },
        title: {
          text: 'Tasks Timeline',
          align: 'left',
          style: {
            fontSize: '12px', // Title font size
            fontWeight: 'bold' // Title font weight
          }
        },
        subtitle: {
          text:
            '',
          align: 'left',
          style: {
            fontSize: '12px' // Subtitle font size
          }
        },
        
        credits: {
          enabled: false
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Tasks'
            },
            categories: ganttData.map(task => task.name)
        },
        series: [{
          type:'gantt',
            name: 'Tasks',
            data: ganttData.map(task => ({
                name: task.name,
                start: task.start,
                end: task.end,
                y: ganttData.findIndex(t => t.name === task.name),
            }))
        }],
        tooltip: {
            pointFormat: '<b>{point.name}</b>: {point.start:%e. %b %Y} - {point.end:%e. %b %Y}'
        },
        plotOptions: {
          series: {
              cursor: 'pointer',
              point: {
                  events: {
                      click: function () {
                          // Invoke the onClick callback passed from the component
                          handleTaskClick(this);
                      }
                  }
              }
          }
      },
    };
    this.showChart=true
}
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
      this.updateDetails((event.container.data[event.currentIndex] as any).id,(TaskStates as any)[event.container.id])
    }
  }
  async updateDetails(id:number, state:number) {

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
          this.router.navigate(['/', 'task', 'report'], {
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
    this.listOfDisplayData = this.groupByState([...this.pendingInvoices]);

    this.loading = false;
    this.total = this.pendingInvoices.length; // mock the total data here
    this.createGanttChart()
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