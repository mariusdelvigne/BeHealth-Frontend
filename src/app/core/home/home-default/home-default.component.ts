import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-home-default',
  standalone: true,
  imports: [],
  templateUrl: './home-default.component.html',
  styleUrl: './home-default.component.scss'
})
export class HomeDefaultComponent implements AfterViewInit {
  @ViewChild('content') content!: ElementRef;

  ngAfterViewInit() {
    setTimeout(() => {
      this.content.nativeElement.style.opacity = '1';
      this.content.nativeElement.style.transform = 'translateX(0)';
    }, 0);
  }
}
