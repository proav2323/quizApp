import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuizComponent } from './add-quiz.component';
import { QuizService } from 'src/app/services/quiz.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('AddQuizComponent', () => {
  let component: AddQuizComponent;
  let fixture: ComponentFixture<AddQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddQuizComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatSlideToggleModule,
        MatSnackBarModule,
      ],
      providers: [QuizService, AuthService, CategoryService],
    });
    fixture = TestBed.createComponent(AddQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
