import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullToString',
})
export class NullToStringPipe implements PipeTransform {
  transform(value: string | null): string {
    if (value === null) return 'null';
    return value;
  }
}