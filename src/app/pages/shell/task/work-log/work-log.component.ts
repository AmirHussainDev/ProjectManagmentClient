import { Component, Input, OnInit } from '@angular/core';
import { ContractorWorkLog, ContractorWorkLogForm, Client } from '../../../../services/app.interfact';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppService } from '../../../../services/app.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-work-log',
  templateUrl: './work-log.component.html',
  styleUrl: './work-log.component.css'
})
export class WorkLogComponent implements OnInit {
  @Input() contractDetails: any
  addContractorWorkLogForm: FormGroup<ContractorWorkLogForm>;
  projectItems: any[] = [];
  @Input() task_id: number;
  @Input() user_id: number;
  date: Date;
  active=false;
  listOfColumn = [
    
    {
      title: 'User',
      compare: (a: ContractorWorkLog, b: ContractorWorkLog) => a.created_by.name - b.created_by.name,
      priority: 1
    },
    {
      title: 'Created At',
      compare: (a: ContractorWorkLog, b: ContractorWorkLog) => a.created_by.date_created - b.created_by.date_created,
      priority: 2
    },
    {
      title: 'Hours',
      compare: (a: ContractorWorkLog, b: ContractorWorkLog) => (a.no_of_hours ? 1 : 0) - (b.no_of_hours ? 1 : 0),
      priority: 3
    },
    {
      title: 'Note',
      compare: (a: ContractorWorkLog, b: ContractorWorkLog) => a.note.localeCompare(b.note),
      priority: 4
    },
    {
      title: 'Action',
      compare: (a: ContractorWorkLog, b: ContractorWorkLog) => a.amount - b.amount,
      priority: 5
    },
  ];
  listOfData: ContractorWorkLog[] = [
  ];

  visible = false;
  isVisible = false;
  isOkLoading = false;

  ContractorWorkLogRoles: any[];
  users: any[];
  clients: Client[];
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
      this.isVisible = false;

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
    this.clients = await this.appService.saveSiteContractorWorkLog({ ...this.addContractorWorkLogForm.getRawValue(),userId:this.user_id, task: this.task_id });
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
      no_of_hours: new FormControl(0),
      contract: new FormControl(this.contractDetails.id),
      site: new FormControl(this.task_id),
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
    this.listOfData = await this.appService.retrieveWorkLogByTaskId(this.task_id)
    this.updateEditCache();
  }

  index = 0;
  addItem(input: HTMLInputElement): void {
    const value = input.value;
    if (!this.projectItems.some(pro => !value || pro.name === value.trim())) {
      this.projectItems = [...this.projectItems, { name: input.value, isCustom: true }];
      input.value = ''
    }
  }
  onChange(event: Date[]) {
    if (event && event.length > 1) {
      const no_of_hours = this.appService.getNumberOfDays(event[0], event[1], this.contractDetails.include_weekends)
      this.addContractorWorkLogForm.patchValue({
        work_from: event[0], work_to: event[1],
        no_of_hours, amount: no_of_hours * this.contractDetails.amount_per_unit
      },{emitEvent:false});
    }
  }
  setAmout(event:Event){
    this.addContractorWorkLogForm.patchValue({
      work_from: new Date(), work_to: new Date(),
      no_of_hours:Number((event.target as any).value), amount: Number((event.target as any).value) * this.contractDetails.amount_per_unit
    },{emitEvent:false});
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
