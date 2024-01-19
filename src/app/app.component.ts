import { AlogoliaService } from './services/alogolia.service';
import { AuthService } from './services/auth.service';
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
  title = 'Quiz App';
  constructor(
    private AuthService: AuthService,
    private AlogoliaService: AlogoliaService
  ) {
    initFlowbite();
    this.AuthService.getUser();
    this.AlogoliaService.insilizeAloglia();
  }
}
