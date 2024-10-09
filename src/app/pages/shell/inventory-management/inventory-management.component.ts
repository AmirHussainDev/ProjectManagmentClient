import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { Subscription, async } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { index } from 'd3';
import { ExportSheetService } from '../../../services/export-sheet.service';

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.css']
})
export class InventoryManagementComponent implements OnInit, OnDestroy {
  selectedProject: { name: string, id: number };
  itemName: string;
  itemQuantity: number;
  itemUnitPrice: number;
  inventory: any[] = [];
  loading = false;
  clientSubscription: Subscription
  projectItems: { name: string, qty: number, unit_price: number }[] = [];
  inventoryItemForm: FormGroup;
  isVisible = false;
  expandSet = new Set<string>();
  currentOrganizationId=0;
  searchVisible: boolean;
  searchValue: any;
  listOfDisplayData: any[];
  listOfColumn = [
    {
      title: 'Name',
      compare: (a: any, b: any) => a.name.localeCompare(b.name),
      priority: false
    },
    {
      title: 'Project',
      compare: (a: any, b: any) => a.project_name.localeCompare(b.project_name),
      priority: 2
    },
    {
      title: 'Qunantity',
      compare: (a: any, b: any) => a.qty - b.qty,
      priority: 3
    },
    {
      title: 'Latest Unit Price',
      compare: (a: any, b: any) => a.latest_unit_price - b.latest_unit_price,
      priority: 4
    },
    {
      title: 'Average Unit Price',
      compare: (a: any, b: any) => a.avg_unit_price - b.avg_unit_price,
      priority: 5
    },
    {
      title: 'Total',
      compare: (a: any, b: any) => a.total - b.total,
      priority: 5
    }
  ];

  constructor(private fb: FormBuilder,
    private exportSheetService:ExportSheetService,

    private appService: AppService) {
    this.inventoryItemForm = this.fb.group({
      task_id: [null],
      sale_id: [null],
      stock_in: [true, Validators.required],
      name: [null, Validators.required],
      project_id: [0],
      qty: [null, Validators.required],
      unit_price: [null, Validators.required],
      description: [null],
      total: [null]
    });

  }
  async onExpandChange(name: string, checked: boolean, index: number) {
    if (checked) {
      if (!this.inventory.find(item=>item.name===name).expanded) {
        this.inventory.find(item=>item.name===name).subDetails = await this.appService.getInventoryItemDetails(name)
        this.inventory.find(item=>item.name===name).expanded = true;
      }
      this.expandSet.add(name);
    } else {
      this.expandSet.delete(name);
    }
  }

  export(): void {
    const data = this.listOfDisplayData ;
    this.exportSheetService.exportDataToXLSX(data, 'Inventory');
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.inventoryItemForm.reset();
  }
  ngOnInit(): void {
    this.clientSubscription = this.appService.currentClient.subscribe(change => {
      if (change && change.id > 0 && this.currentOrganizationId != change.id) {
      this.currentOrganizationId=change.id;
        this.loadInventory();

      }
    });
  }

  ngOnDestroy(): void {
    if (this.clientSubscription) {
      this.clientSubscription.unsubscribe();
    }
  }
  async loadInventory() {
    this.loading = true
    this.inventory = await this.appService.getInventory()
     this.listOfDisplayData=this.inventory;
    this.loading = false
  }
  async onProjectChange() {
    this.projectItems = await this.appService.getProjectItems(this.selectedProject?.id)

  }
  addOrUpdateItem(): void {
    // Logic to add or update inventory item
  }

  deleteItem(index: number): void {
    // Logic to delete inventory item
  }

  editItem(index: any): void {

  }

  addItem(): void {

  }
  clearForm(): void { }

  async submitForm() {
    if (this.inventoryItemForm.valid) {
      const response = await this.appService.addInventory(this.inventoryItemForm.getRawValue())
      console.log(response);
      this.isVisible = false;
      this.inventoryItemForm.reset();

      this.loadInventory();
    }
  }

  setTotal(): void {
    this.inventoryItemForm.get('total')?.setValue(
      (this.inventoryItemForm.get('qty')?.value * this.inventoryItemForm.get('unit_price')?.value)
    )
  }


  search(): void {
    this.searchVisible = false;
    if(this.searchValue){
      this.listOfDisplayData = this.inventory.filter((item:any) => (item.project_name&&item.project_name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1)||(item.item_name&&item.item_name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1));
      console.log(this.listOfDisplayData)
  
    }else{
      this.listOfDisplayData = this.inventory
    }
  }
}
