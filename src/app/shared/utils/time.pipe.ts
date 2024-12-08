import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {

  transform(seconds: number): string {
    let minutes = Math.floor(seconds / 60 % 60);
    let hours = Math.floor(seconds / 3600);
    return `${hours}h ${minutes}min`;
  }

}
