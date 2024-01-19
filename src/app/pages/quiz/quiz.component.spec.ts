import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizComponent } from './quiz.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { QuizService } from 'src/app/services/quiz.service';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizComponent],
      imports: [AppRoutingModule, MatSnackBarModule],
      providers: [QuizService],
    });
    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
