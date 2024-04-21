import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { HttpParams } from '@angular/common/http';
import { AppService } from '../../../../services/app.service';
import { Subscription } from 'rxjs';
import { ContractStateNames, ContractStates } from '../../../../services/app.constants';

@Component({
  selector: 'app-site-contractors',
  templateUrl: './site-contractors.component.html',
  styleUrl: './site-contractors.component.css'
})
export class SiteContractorsComponent implements OnInit, OnDestroy {
  loading = true;
  apiUrl = environment.apiUrl;
  filterStates = Object.keys(ContractStateNames).map((res: any) => ({ text: ContractStateNames[res], value: res }))
  contracts: any[] = [];
  states = ContractStates;
  stateNames=ContractStateNames;
  subOrgSubscription: Subscription;

  constructor(private appService:AppService){

  }
  ngOnInit(): void {
    this.subOrgSubscription = this.appService.currentSubOrganization.subscribe(change => {
      this.loadContractsDataFromServer();
    });
  }
  onContractsQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadContractsDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  loadContractsDataFromServer(
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
    this.getAndSetContracts(params);

  }

  async getAndSetContracts(params: HttpParams) {
    this.contracts = await this.appService.retireveContracts(params)
    this.loading = false;
  }

  ngOnDestroy(): void {
    if (this.subOrgSubscription) { this.subOrgSubscription.unsubscribe() }
  }
}
