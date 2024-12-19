import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {

  transform(seconds: number): string {
    const minutes = Math.floor(seconds / 60 % 60);
    const hours = Math.floor(seconds / 3600);

    let display = `${minutes} min`;
    if (hours > 0)
      display = `${hours} h ` + display;

    return  display
  }
}
