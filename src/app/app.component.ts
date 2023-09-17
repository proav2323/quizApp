import { Component } from '@angular/core';
import { Carousel, initFlowbite } from 'flowbite';
import type {
  CarouselItem,
  CarouselOptions,
  CarouselInterface,
} from 'flowbite';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'quizApp';
  constructor() {
    initFlowbite();
  }
}
