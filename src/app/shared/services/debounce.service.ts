import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DebounceService {

  constructor() { }

  debounce(fn: (...args: any[]) => void, delay: number): (...args: any[]) => void {
    let debounceTimer: any;
    return (...args: any[]) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => fn.apply(this, args), delay);
    };
  }
}
