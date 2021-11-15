import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'reverse' })
export class ReversePipe implements PipeTransform {
  transform(value: any[] | null) {
    if (value === null) return;
    return value.slice().reverse();
  }
}
