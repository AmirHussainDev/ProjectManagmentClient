import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../services/user.service';

@Pipe({
  name: 'username',
  standalone: true
})
export class UsernamePipe implements PipeTransform {

  constructor(private userService: UserService) { }
  transform(value: unknown, ...args: unknown[]): unknown {
    const user = this.userService.users?.find(user => user.id == value)
    return user ? user.name : value;
  }

}
