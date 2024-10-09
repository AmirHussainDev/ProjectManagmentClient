import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { AppService } from '../../../../services/app.service';
import { AppPermissions } from '../../../../services/app.constants';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent {
  @Input() project: any;
  @Input() visible: any = false;

  @Output() closeDrawer = new EventEmitter<boolean>();
  selectedProject: any;
  placement: NzDrawerPlacement = 'right';
  products: { name: string }[] = [];
  newProduct: string = '';
  appPermissions=AppPermissions;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getAndSetItems();
  }

  async getAndSetItems() {
    this.products = await this.appService.getProjectItems(this.project.id);
  }

  async addNewItem() {
    if (this.newProduct && this.newProduct.trim()) {
      await this.appService.addProjectItem(this.project.id, this.newProduct.trim());
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
