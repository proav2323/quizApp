import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { QuizService } from 'src/app/services/quiz.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [AppRoutingModule, MatSnackBarModule],
      providers: [QuizService],
    });
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
