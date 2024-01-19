import { TestBed } from '@angular/core/testing';

import { QuizService } from './quiz.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from '../app-routing.module';
import { AlogoliaService } from './alogolia.service';

describe('QuizService', () => {
  let service: QuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule, MatSnackBarModule],
      providers: [AlogoliaService],
    });
    service = TestBed.inject(QuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
