// has-permission.directive.ts
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from '../services/user.service';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService
  ) {}

  @Input() set appHasPermission(permission: any) {
    if (this.userService.loggedInUser.is_admin || this.userService.hasPermission(permission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
