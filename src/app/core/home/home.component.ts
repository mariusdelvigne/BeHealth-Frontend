import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('content') content!: ElementRef;

  ngAfterViewInit() {
    setTimeout(() => {
      this.content.nativeElement.style.opacity = '1';
      this.content.nativeElement.style.transform = 'translateX(0)';
      }, 250); // Délai pour assurer que l'animation se joue après le rendu initial
  }
}
