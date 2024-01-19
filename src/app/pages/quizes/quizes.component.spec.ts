import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizesComponent } from './quizes.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/services/quiz.service';
import { CategoryService } from 'src/app/services/category.service';

describe('QuizesComponent', () => {
  let component: QuizesComponent;
  let fixture: ComponentFixture<QuizesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizesComponent],
      imports: [MatSnackBarModule],
      providers: [QuizService, CategoryService],
    });
    fixture = TestBed.createComponent(QuizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
