import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { HttpParams } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import { ProjectsGraphKeys, TaskSeverity, TaskStateNames } from '../../../services/app.constants';
import { Client } from '../../../services/app.interfact';
import more from 'highcharts/highcharts-more';
more(Highcharts);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  isHighcharts = typeof Highcharts === 'object';
  title = 'UnivHighCharts';
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor: string = 'chart';
  sitesGraphKeys: any = ProjectsGraphKeys
  chartOptions: Highcharts.Options = {};
  siteChartOptions: Highcharts.Options = {};
  stateNames = TaskStateNames;
  piechartOptions: Highcharts.Options = {};
  lineChartOptions: Highcharts.Options = {};
  clientSubscription: Subscription;
  showTopTen = false;
  currentOrganizationId = 0;
  currentClient: Client;
  items: any[];
  selectedItem = ''
  showMonthly = false;
  projectStats: any = {};
  showChart: boolean;
  totalApprovedHours: any;
  totalEstimatedHours: any;
  paidApprovedHours: any;
  constructor(private appService: AppService) {
    this.chartOptions = {
      chart: {
        type: 'gauge',
        plotBackgroundColor: '',
        plotBorderWidth: 0,
        plotShadow: false,
        height: '80%'
      },
      title: {
        text: 'Progress %',
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

      pane: {
        startAngle: -90,
        endAngle: 90,
        background: [], // No background
        center: ['50%', '70%'], // Adjusted center to lower
        size: '100%' // Size of the gauge
      },
      credits: {
        enabled: false
      },
      yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: [0, 50, 100],
        tickLength: 0, // Remove the ticks
        labels: {
          enabled: false, // Remove yAxis labels
        },
        plotBands: [{
          from: 0,
          to: 50,
          color: '#6A55FF', // Purple color for the left side
          thickness: '50%',
        }, {
          from: 50,
          to: 100,
          color: '#E0E0E0', // Gray color for the right side
          thickness: '50%',
        }]
      },
      series: [{
        type: 'gauge',
        name: 'Progress',
        data: [52], // This value is displayed
        dataLabels: {
          format: '{y} %',
          borderWidth: 0,
          style: {
            fontSize: '18px', // Center value font size
            fontWeight: 'bold'
          },
          y: 20, // Adjust position of label
        },
        dial: {
          radius: '100%',
          backgroundColor: '#4D4D4D', // Dark gray needle color
          baseWidth: 10, // Needle width
          rearLength: '0%' // No tail behind needle
        },
        pivot: {
          backgroundColor: '#4D4D4D', // Same as needle
          radius: 6 // Small pivot size
        }
      }]
    };


    this.siteChartOptions = {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Task Breakdown by Status',
        align: 'left',
        style: {
          fontSize: '12px', // Title font size
          fontWeight: 'bold' // Title font weight
        }
      },
      credits: {
        enabled: false
      },
      subtitle: {
        text:
          '',
        align: 'left',
        style: {
          fontSize: '12px' // Subtitle font size
        }
      },

      xAxis: {
        categories: [] // Initialize it as an empty array
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Tasks Count',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
      series: [{
        type: 'bar',
        name: 'Tasks',
        data: []
      }],
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      }
    };

    this.piechartOptions = {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Tasks By Severity',
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
      tooltip: {
        valueSuffix: '',
        style: {
          fontSize: '11px' // Tooltip font size
        }
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.2f} %',
            distance: -30
          }
        }
      },

      series: []
    };

    this.lineChartOptions = {
      chart: {
        type: 'column',
        backgroundColor: 'transparent', // Set chart background color to transparent
        height: 218 // Set the height of the chart
      },
      credits: {
        enabled: false
      },
      title: {
        text: '',
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

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 0
        }
      },
      xAxis: {
        categories: []
      },
      series: [],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {}
        }]
      },
      legend: {
        enabled: true
      }
    };

  }

  ngAfterViewInit(): void {
  }
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    this.clientSubscription = this.appService.currentClient.subscribe(change => {
      if (change && change.id > 0 && this.currentOrganizationId != change.id) {
        this.currentOrganizationId = change.id;
        this.currentClient = change;
        this.loadData();
      }
    });
  }

  async loadData() {
    await this.getProjectStats(this.currentOrganizationId)
    this.setProjectProgress(this.currentOrganizationId);

    this.loadStatistics(this.currentOrganizationId)
  }
  async loadStatistics(clientId: number) {
    this.showChart = false;
    const stats: any[] = this.projectStats.tasks;

    // Extract site names for the x-axis categories
    const siteNames = stats.map(stat => stat.siteName);

    // Initialize an empty array to store series data
    const series: any[] = [];

    stats.forEach((serdata, index) => {
      Object.entries(serdata).forEach(([key, value]) => {
        if (key !== 'siteId' && key !== 'siteName') {
          if (index === 0) {
            series.push({
              name: this.sitesGraphKeys[key],

              data: [value]
            });
          } else {
            const seriesItem = series.find(item => item.name === this.sitesGraphKeys[key]);
            if (seriesItem) {
              seriesItem.data.push(value);
            }
          }
        }
      });
    });

    const taskCounts: any = {};

    // Populate task counts based on task states
    this.projectStats.tasks.forEach((task: { state: string | number; }) => {
      const moduleName = this.stateNames[task.state]; // Map state to module
      if (!taskCounts[moduleName]) {
        taskCounts[moduleName] = 0; // Initialize if not already set
      }
      taskCounts[moduleName]++; // Increment task count for this module
    });

    // Set categories for the chart based on the module names
    if (this.siteChartOptions.xAxis && this.siteChartOptions.xAxis) {
      (this.siteChartOptions.xAxis as Highcharts.XAxisOptions)['categories'] = Object.values(this.stateNames);

    }
    // Set series data based on task counts
    if (this.siteChartOptions.series && this.siteChartOptions.series[0]) {
      (this.siteChartOptions.series[0] as Highcharts.SeriesBarOptions)['data'] = Object.keys(this.stateNames).map(stateId => {
        const moduleName = this.stateNames[stateId];
        return taskCounts[moduleName] || 0; // Use 0 if no tasks for that module
      });
    }
    setTimeout(() => {
      this.showChart = true;
    }, 100)
  }

  async getProjectStats(currentOrganizationId: number = 0) {
    this.projectStats = await this.appService.getProjectStatsByClient(currentOrganizationId)
    this.totalApprovedHours = this.projectStats.worklogs.reduce((sum: number, worklog: any) => sum + (worklog.approved_hours || worklog.no_of_hours || 0), 0);
    this.paidApprovedHours = this.projectStats.worklogs.filter((log: any) => log.paid).reduce((sum: number, worklog: any) => sum + (worklog.approved_hours || worklog.no_of_hours || 0), 0);
    this.totalEstimatedHours = this.calculateTotalEstimatedHours(this.projectStats.tasks);
  }

  // Function to calculate the total estimated hours
  calculateTotalEstimatedHours(tasks: any[]) {
    return tasks.reduce((totalHours, task) => {
      const startDate = new Date(task.start_date);
      const dueDate = new Date(task.due_date);

      // Calculate the difference in time (milliseconds)
      const totalDays = Math.floor((dueDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) as number;

      // Calculate estimated time based on 8 hours per day
      const estimatedTime = totalDays * 8; // 8 hours per day
      // Convert the time difference into hours
      // const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

      // Add the task's estimated hours to the total
      return totalHours + estimatedTime;
    }, 0);
  };



  async setProjectProgress(currentOrganizationId: number = 0) {
    this.showTopTen = false;

    // Assign the series to your chartOptions
    const totalTasks = this.projectStats.tasks.length;

    // Filter tasks where the state is 4 (completed)
    const completedTasks = this.projectStats.tasks.filter((task: { state: number; }) => task.state === 4).length;

    // Calculate the completed percentage
    const completedPercentage = Math.round((completedTasks / totalTasks) * 100);
    const series = [];

    // Insert the completed percentage at position 0
    series[0] = {

      type: 'gauge',
      name: 'Progress',
      data: [completedPercentage], // This value is displayed
      dataLabels: {
        format: '{y} %',
        borderWidth: 0,
        style: {
          fontSize: '18px', // Center value font size
          fontWeight: 'bold'
        },
        y: 20, // Adjust position of label
      },
      dial: {
        radius: '100%',
        backgroundColor: '#4D4D4D', // Dark gray needle color
        baseWidth: 10, // Needle width
        rearLength: '0%' // No tail behind needle
      },
      pivot: {
        backgroundColor: '#4D4D4D', // Same as needle
        radius: 6 // Small pivot size
      }
      // Inserting completed % at index 0
    } as Highcharts.SeriesGaugeOptions;
    this.chartOptions.series = series;
    this.chartOptions.yAxis = {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickPositions: [0, 50, 100],
      tickLength: 0, // Remove the ticks
      labels: {
        enabled: false, // Remove yAxis labels
      },
      plotBands: [{
        from: 0,
        to: completedPercentage,
        color: '#6A55FF', // Purple color for the left side
        thickness: '50%',
      }, {
        from: completedPercentage,
        to: 100,
        color: '#E0E0E0', // Gray color for the right side
        thickness: '50%',
      }]
    };
    const severityCounts: any = {
      Medium: 0,
      Low: 0,
      Critical: 0,
      High: 0
    };

    this.projectStats.tasks.forEach((task: { severity: string | number; }) => {
      const severityLabel = TaskSeverity[(task.severity as number)];
      if (severityLabel) {
        severityCounts[severityLabel]++;
      }
    });
    const pieChartSeries = [{
      name: 'Tasks',
      colorByPoint: true,
      data: [
        { name: 'Low', y: severityCounts.Low, color: '#00FF00' },         // Green for Low
        { name: 'Medium', y: severityCounts.Medium, color: '#0000FF' },    // Blue for Medium
        { name: 'High', y: severityCounts.High, color: '#FF8000' },        // Orange for High
        { name: 'Critical', y: severityCounts.Critical, color: '#FF0000' } // Red for Critical
      ]
    }]

    // Assign the series to your piechartOptions
    this.piechartOptions.series = pieChartSeries as any[];
    setTimeout(() => {
      this.showTopTen = true;

    }, 100)
    this.setItemBasedTrend()
  }

  async setItemBasedTrend() {
    this.showMonthly = false
    const worklogs = this.projectStats.worklogs;
    const tasks = this.projectStats.tasks;

    // Initialize data structures
    const estimatedTimes: any = {};
    const consumedHours: any = {};
    const taskIds: any[] = [];
    const taskNo: any[] = [];

    // Calculate estimated time and consumed hours for each task
    tasks.forEach((task: {task_no:any, start_date: string | number | Date; due_date: string | number | Date; id: string | number; title: any; }) => {
      const startDate = new Date(task.start_date||task.due_date|| new Date());
      const dueDate = new Date(task.due_date||task.start_date|| new Date());
      const totalDays = Math.floor((dueDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) as number;

      // Calculate estimated time based on 8 hours per day
      const estimatedTime = totalDays * 8; // 8 hours per day
      estimatedTimes[task.id] = estimatedTime; // Store estimated time
      consumedHours[task.id] = 0; // Initialize consumed hours
      taskIds.push(task.id); // Store task titles for xAxis
      taskNo.push(task.task_no)
    });

    // Calculate total consumed hours for each task
    worklogs.forEach((worklog: { id: any; no_of_hours: any; approved_hours: any }) => {
      const taskId = worklog.id; // Assuming worklog.id corresponds to task.id
      consumedHours[taskId] += (worklog.approved_hours || worklog.no_of_hours || 0); // Sum up the hours
    });

    // Prepare series data for the chart
    const seriesData = ([{
      name: 'Estimated Time',
      data: taskIds.map(id => estimatedTimes[id] || 0),
      type: 'column', // Use 'column' for estimated time
      color: 'blue' // You can set a color for estimated time
    },
    {
      name: 'Consumed Time',
      data: taskIds.map(id => consumedHours[id] || 0),
      type: 'line', // Use 'line' for consumed time
      color: 'red', // Line color
      marker: {
        enabled: true
      }
    }] as any[]);

    // Mark bars red when consumed time exceeds estimated time
    seriesData[0].data = seriesData[0].data.map((estimate: number, index: string | number) => {
      return consumedHours[tasks[index].id] > estimate ? { y: estimate, color: 'red' } : estimate;
    });

    // Update chart options
    if (this.lineChartOptions.xAxis) {
      (this.lineChartOptions.xAxis as Highcharts.XAxisOptions).categories = taskNo; // Set xAxis categories
      this.lineChartOptions.series = seriesData; // Set series data
    }

    setTimeout(() => {
      this.showMonthly = true
    }, 100)
  }
}