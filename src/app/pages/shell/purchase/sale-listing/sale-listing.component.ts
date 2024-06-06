import { Component } from '@angular/core';
import { SaleStates, SaleStateNames } from '../../../../services/app.constants';
import { AppService } from '../../../../services/app.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-sale-listing',
  templateUrl: './sale-listing.component.html',
  styleUrl: './sale-listing.component.css'
})
export class SaleListingComponent {
  saleRequests: any[] = [];
  showSide = false;
  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  states = SaleStates;
  stateNames = SaleStateNames;
  filterStates = Object.keys(SaleStateNames).map((res: any) => ({ text: SaleStateNames[res], value: res }))
  subOrgSubscription: Subscription;
  status = '';
  currentOrganizationId=0;
  constructor(
    private appService: AppService,
    private media: MediaMatcher,
    private route: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.subOrgSubscription = this.appService.currentSubOrganization.subscribe(change => {
      if (change && change.id > 0 && this.currentOrganizationId != change.id) {
        if(this.currentOrganizationId){
          this.router.navigate(['/','purchase','sales'], {
            queryParams: {
              'SALE': null,
            },
            queryParamsHandling: 'merge'
          })
        }
          this.currentOrganizationId=change.id;
          this.route.queryParams.subscribe(async(params) => {
            // Use this queryParams object to load data
            
             if (!params['SALE']) {
            this.showSide=false
            this.loadSaleDataFromServer();

            }else{
              this.showSide=true
            }
          // Do something with the query parameters
          this.status = params['status'];
          if(this.status){
            this.loadSaleDataFromServer();
            this.showSide = false;  
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
  async getAndSetSaleRequests(params: HttpParams) {
    this.loading = true;
    this.saleRequests = await this.appService.retireveSaleByState(params)
    this.loading = false;
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
    if ((!filters || !filters.length)&&this.status&& parseInt(this.status) !== this.states.Quote) {
      params = params.append('state', this.status);
    }
    this.getAndSetSaleRequests(params);

  }

  onSaleQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadSaleDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  isMobile(): boolean {
    const isMobile = this.media.matchMedia('(max-width: 600px)');
    return isMobile.matches;
  }

  openDetails(){
    this.showSide=true
  }
}
