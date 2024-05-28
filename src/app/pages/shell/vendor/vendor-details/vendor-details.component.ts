import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { AppService } from '../../../../services/app.service';
import { AppPermissions } from '../../../../services/app.constants';

@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.css']
})
export class VendorDetailsComponent {
  @Input() vendor: any;
  @Input() visible: any = false;

  @Output() closeDrawer = new EventEmitter<boolean>();
  selectedVendor: any;
  placement: NzDrawerPlacement = 'right';
  products: { name: string }[] = [];
  newProduct: string = '';
  appPermissions=AppPermissions;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getAndSetItems();
  }

  async getAndSetItems() {
    this.products = await this.appService.getVendorItems(this.vendor.id);
  }

  async addNewItem() {
    if (this.newProduct && this.newProduct.trim()) {
      await this.appService.addVendorItem(this.vendor.id, this.newProduct.trim());
    }
  }

  showDrawer(): void {
    this.visible = true;
  }

  onClose(): void {
    this.visible = false;
    this.closeDrawer.emit(true);
  }

  async handleAddProduct() {
    if (this.newProduct.trim() !== '') {
      this.products.push({ name: this.newProduct.trim() });
      await this.addNewItem();
      this.newProduct = '';
      this.getAndSetItems();
    }
  }

}
