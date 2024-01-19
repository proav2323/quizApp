import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizCardComponent } from './quiz-card.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { QuizService } from 'src/app/services/quiz.service';

describe('QuizCardComponent', () => {
  let component: QuizCardComponent;
  let fixture: ComponentFixture<QuizCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizCardComponent],
      imports: [MatSnackBarModule, MatMenuModule, MatSnackBarModule],
      providers: [AuthService, QuizService],
    });
    fixture = TestBed.createComponent(QuizCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
