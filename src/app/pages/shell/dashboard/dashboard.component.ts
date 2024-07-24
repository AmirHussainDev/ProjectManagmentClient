import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { HttpParams } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import { SitesGraphKeys } from '../../../services/app.constants';


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
  sitesGraphKeys:any=SitesGraphKeys
  chartOptions: Highcharts.Options = {};
  siteChartOptions: Highcharts.Options = {};
  piechartOptions: Highcharts.Options = {};
  lineChartOptions: Highcharts.Options = {};
  subOrgSubscription: Subscription;
  showTopTen = false;
  currentOrganizationId = 0;
  items: any[];
  selectedItem = ''
  showMonthly = false;
  inventoryStats: any = {};
  showChart: boolean;
  constructor(private appService: AppService) {
    this.chartOptions = {
      chart: {
        type: 'column',
        backgroundColor: 'transparent', // Set chart background color to transparent
        height: 300 // Set the height of the chart
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Top 10 Products in Hand',
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
      xAxis: {
        categories: [],
        crosshair: true,
        accessibility: {
          description: 'Countries'
        },
        labels: {
          style: {
            fontSize: '11px' // X-axis labels font size
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: '',
          style: {
            fontSize: '12px' // Y-axis title font size
          }
        },
        labels: {
          style: {
            fontSize: '11px' // Y-axis labels font size
          }
        }
      },
      tooltip: {
        valueSuffix: ' ',
        style: {
          fontSize: '11px' // Tooltip font size
        }
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: []
    };

    this.siteChartOptions = {
      chart: {
        type: 'column',
        backgroundColor: 'transparent', // Set chart background color to transparent
        height: 300 // Set the height of the chart
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Site Expenses',
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
      xAxis: {
        categories: [],
        crosshair: true,
        accessibility: {
          description: 'Countries'
        },
        labels: {
          style: {
            fontSize: '11px' // X-axis labels font size
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: '',
          style: {
            fontSize: '12px' // Y-axis title font size
          }
        },
        labels: {
          style: {
            fontSize: '11px' // Y-axis labels font size
          }
        }
      },
      tooltip: {
        valueSuffix: ' ',
        style: {
          fontSize: '11px' // Tooltip font size
        }
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: []
    };

    this.piechartOptions = {
      chart: {
        plotShadow: false,
        type: 'pie',
        height: 250,
        backgroundColor: 'transparent'
      },
      title: {
        text: 'Available Stock',
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
            enabled: false
          },
          showInLegend: true
        }
      },
      legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical' // optional, to display legend items vertically
        // other legend configurations
      },
      series: []
    };

    this.lineChartOptions = {
      chart: {
        type: 'line',
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
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      series: [],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {

          }
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
    this.subOrgSubscription = this.appService.currentSubOrganization.subscribe(change => {
      if (change && change.id > 0 && this.currentOrganizationId != change.id) {
        this.currentOrganizationId = change.id;
        this.loadInventory(this.currentOrganizationId);
        this.getInventoryStats(this.currentOrganizationId)
        this.loadStatistics(this.currentOrganizationId)
      }
    });
  }
  async loadStatistics(subOrgId: number) {
    this.showChart = false;
    const stats: any[] = await this.appService.retireveAllSiteStatistics(subOrgId);
  
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
            const seriesItem = series.find(item => item.name === key);
            if (seriesItem) {
              seriesItem.data.push(value);
            }
          }
        }
      });
    });
  
    this.showChart = true;
  
    // Assign the series and categories to your chartOptions
    this.siteChartOptions = {
      ...this.siteChartOptions,
      xAxis: {
        ...this.siteChartOptions.xAxis,
        categories: siteNames,
      },
      series: series as any,
    };
  }
  
  async getInventoryStats(currentOrganizationId: number = 0) {
    this.inventoryStats = await this.appService.getInventoryStatsBySubOrganization(currentOrganizationId)

  }

  async loadInventory(currentOrganizationId: number = 0) {
    this.showTopTen = false;

    const serdata = await this.appService.getInventory(currentOrganizationId)
    // Iterate through the data to organize it by vendor name
    // Initialize an empty object to store series data
    const seriesData: any = {};
    this.items = serdata.map((data: any) => data.item_name)
    this.selectedItem = this.items[0]
    // Iterate through the data to organize it by vendor name
    serdata.forEach(item => {
      if (!seriesData[item.vendor_name]) {
        seriesData[item.vendor_name] = [];
      }
      seriesData[item.vendor_name].push({
        name: item.item_name,
        y: parseFloat((parseInt(item.qty) * parseInt(item.latest_unit_price)).toString())  // Convert total to float
      });
    });

    // Convert seriesData object into an array
    const series = Object.entries(seriesData).map(([vendorName, data]) => ({
      name: vendorName,
      data
    }));


    // Assign the series to your chartOptions
    this.chartOptions.series = series as any;

    const pieChartData: any[] = [];

    // Iterate through the data to construct the pie chart series
    serdata.forEach(item => {
      pieChartData.push({
        name: item.item_name,
        y: parseFloat(item.qty)  // Convert total to float
      });
    });

    // Construct the series array for pie chart options
    const pieChartSeries = [{
      name: 'Quantity',
      colorByPoint: true,
      data: pieChartData
    }];

    // Assign the series to your piechartOptions
    this.piechartOptions.series = pieChartSeries as any[];

    this.showTopTen = true;
    this.setItemBasedTrend()
  }

  async setItemBasedTrend() {
    this.showMonthly = false
    const inventoryDetails = await this.appService.getInventoryItemDetails(this.selectedItem);
    console.log(inventoryDetails)
    const monthlyPurchaseData = Array(12).fill(0);
    const monthlySaleData = Array(12).fill(0);

    // Iterate through the data to aggregate quantities by month
    inventoryDetails.forEach(item => {
      const date = new Date(item.date_created);
      const month = date.getMonth();
      const quantity = parseInt(item.qty);

      if (item.stock_in) {
        monthlyPurchaseData[month] += quantity;
      } else {
        monthlySaleData[month] += quantity;
      }
    });

    // Construct the series array for line chart options
    const lineChartSeries = [
      {
        name: 'Purchase',
        data: monthlyPurchaseData
      },
      {
        name: 'Sale',
        data: monthlySaleData
      }
    ] as any[];
    console.log(lineChartSeries)
    // Assign the series to your lineChartOptions
    this.lineChartOptions.series = lineChartSeries;
    this.showMonthly = true;
  }
}