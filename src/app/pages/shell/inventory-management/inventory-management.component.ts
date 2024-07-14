import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { Subscription, async } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { index } from 'd3';

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.css']
})
export class InventoryManagementComponent implements OnInit, OnDestroy {
  selectedVendor: { name: string, id: number };
  itemName: string;
  itemQuantity: number;
  itemUnitPrice: number;
  inventory: any[] = [];
  loading = false;
  subOrgSubscription: Subscription
  vendorItems: { name: string, qty: number, unit_price: number }[] = [];
  inventoryItemForm: FormGroup;
  isVisible = false;
  expandSet = new Set<string>();
  currentOrganizationId=0;
  searchVisible: boolean;
  searchValue: any;
  listOfDisplayData: any[];
  constructor(private fb: FormBuilder,

    private appService: AppService) {
    this.inventoryItemForm = this.fb.group({
      purchase_id: [null],
      sale_id: [null],
      stock_in: [true, Validators.required],
      name: [null, Validators.required],
      vendor_id: [0],
      qty: [null, Validators.required],
      unit_price: [null, Validators.required],
      description: [null],
      total: [null]
    });

  }
  async onExpandChange(name: string, checked: boolean, index: number) {
    if (checked) {
      if (!this.inventory[index].expanded) {
        this.inventory[index].subDetails = await this.appService.getInventoryItemDetails(name)
        this.inventory[index].expanded = true;
      }
      this.expandSet.add(name);
    } else {
      this.expandSet.delete(name);
    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.inventoryItemForm.reset();
  }
  ngOnInit(): void {
    this.subOrgSubscription = this.appService.currentSubOrganization.subscribe(change => {
      if (change && change.id > 0 && this.currentOrganizationId != change.id) {
      this.currentOrganizationId=change.id;
        this.loadInventory();

      }
    });
  }

  ngOnDestroy(): void {
    if (this.subOrgSubscription) {
      this.subOrgSubscription.unsubscribe();
    }
  }
  async loadInventory() {
    this.loading = true
    this.inventory = await this.appService.getInventory()
     this.listOfDisplayData=this.inventory;
    this.loading = false
  }
  async onVendorChange() {
    this.vendorItems = await this.appService.getVendorItems(this.selectedVendor?.id)

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
      this.listOfDisplayData = this.inventory.filter((item:any) => (item.vendor_name&&item.vendor_name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1)||(item.item_name&&item.item_name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1));
      console.log(this.listOfDisplayData)
  
    }else{
      this.listOfDisplayData = this.inventory
    }
  }
}
