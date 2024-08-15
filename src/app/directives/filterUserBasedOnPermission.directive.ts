import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from '../services/user.service';

@Directive({
  selector: '[filterUser]'
})
export class UserHasPermissionDirective {

  private user: any;
  private permissionName?: number;
  private isAdmin?: boolean;
  private isContractor?: boolean;
  private filterUserId?:number[]=[];
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService
  ) {}

  @Input() set filterUser(params: { user: any; permissionName?: number; isAdmin?: boolean; isContractor?: boolean,userIds?: number[] }) {
    this.user = params.user;
    this.filterUserId= params.userIds;
    this.permissionName = params.permissionName;
    this.isAdmin = params.isAdmin;
    this.isContractor = params.isContractor;
    this.updateView();
  }

  private updateView() {
    const hasPermission = this.isAdmin || this.filterUserId?.includes(this.user.id) || this.userService.userHasPermission(this.permissionName?.toString()||'', this.user);
    const isAuthorized = this.isAdmin || this.isContractor || hasPermission;

    if (isAuthorized) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
