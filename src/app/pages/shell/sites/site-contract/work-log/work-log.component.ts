import { Component, Input, OnInit } from '@angular/core';
import { ContractorWorkLog, ContractorWorkLogForm, SubOrganization } from '../../../../../services/app.interfact';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppService } from '../../../../../services/app.service';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-work-log',
  templateUrl: './work-log.component.html',
  styleUrl: './work-log.component.css'
})
export class WorkLogComponent implements OnInit {
  @Input() contractDetails: any
  addContractorWorkLogForm: FormGroup<ContractorWorkLogForm>;
  vendorItems: any[] = [];
  @Input() site_id: number;
  date: Date;
  listOfColumn = [
    {
      title: 'Note',
      compare: (a: ContractorWorkLog, b: ContractorWorkLog) => a.note.localeCompare(b.note),
      priority: false
    },
    {
      title: 'Amount',
      compare: (a: ContractorWorkLog, b: ContractorWorkLog) => a.amount - b.amount,
      priority: 2
    },
    {
      title: 'No Of Units',
      compare: (a: ContractorWorkLog, b: ContractorWorkLog) => (a.no_of_units ? 1 : 0) - (b.no_of_units ? 1 : 0),
      priority: 2
    },
    // {
    //   title: 'Action',
    //   compare: (a: ContractorWorkLog, b: ContractorWorkLog) => a.amount - b.amount,
    //   priority: 3
    // }
  ];
  listOfData: ContractorWorkLog[] = [
  ];

  visible = false;
  isVisible = false;
  isOkLoading = false;

  ContractorWorkLogRoles: any[];
  users: any[];
  subOrganizations: SubOrganization[];
  constructor(
    private appService: AppService,
    private userService: UserService,
    private fb: FormBuilder) {

  }


  showModal(): void {
    this.isVisible = true;
  }

  async handleOk() {
    try {
      this.isOkLoading = true;
      await this.addContractorWorkLog()
      this.isVisible = false;
      this.addContractorWorkLogForm.reset()
    } catch (err) {

    } finally {
      this.isOkLoading = false;
      this.populateContractorWorkLogData();

    }
  }
  async addContractorWorkLog() {
    this.subOrganizations = await this.appService.saveSiteContractorWorkLog({ ...this.addContractorWorkLogForm.getRawValue(), site: this.site_id });
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  ngOnInit(): void {
    this.addContractorWorkLogForm = new FormGroup({
      id: new FormControl(0),
      amount: new FormControl(0, [Validators.required]),
      note: new FormControl(),
      work_from: new FormControl(new Date()),
      work_to: new FormControl(new Date()),
      no_of_units: new FormControl(0),
      contract: new FormControl(this.contractDetails.id),
      site: new FormControl(this.site_id),
    }) as FormGroup<ContractorWorkLogForm>

    this.populateContractorWorkLogData();
  }



  open(): void {
    this.visible = true;
  }

  close(refresh = false): void {
    this.visible = false;
    if (refresh) {
      this.populateContractorWorkLogData();
    }
  }

  async populateContractorWorkLogData() {
    this.listOfData = await this.appService.retrieveSiteContractWorkLogBySiteId(this.site_id,this.contractDetails.id)
    this.updateEditCache();
  }

  index = 0;
  addItem(input: HTMLInputElement): void {
    const value = input.value;
    if (!this.vendorItems.some(pro => !value || pro.name === value.trim())) {
      this.vendorItems = [...this.vendorItems, { name: input.value, isCustom: true }];
      input.value = ''
    }
  }
  onChange(event: Date[]) {
    if (event && event.length > 1) {
      const no_of_units = this.getNumberOfDays(event[0], event[1], this.contractDetails.includeWeekends)
      this.addContractorWorkLogForm.patchValue({
        work_from: event[0], work_to: event[1],
        no_of_units, amount: no_of_units * this.contractDetails.amount_per_day
      });
    }
  }
  getNumberOfDays(startDate: Date, endDate: Date, includeWeekends: boolean = false): number {
    // Copy the start date so we don't modify the original
    let currentDate = new Date(startDate);
    const daysBetween = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    let count = 0;

    for (let i = 0; i <= daysBetween; i++) {
      // Check if weekends should be included and if the current day is a weekend (Saturday or Sunday)
      if (!includeWeekends && (currentDate.getDay() === 0 || currentDate.getDay() === 6)) {
        // Skip weekends
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
        continue;
      }

      count++;
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    return count;
  }
  editCache: { [key: string]: { edit: boolean; data: ContractorWorkLog } } = {};
  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  async saveEdit(id: number) {
    const index = this.listOfData.findIndex(item => item.id === id);

    this.editCache[id].edit = false;
    Object.assign(this.listOfData[index], this.editCache[id].data);
    // await this.appService.updateSiteContractorWorkLog(this.editCache[id].data)
    this.populateContractorWorkLogData();
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }
}
