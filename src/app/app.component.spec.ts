import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { HomeComponent } from './pages/home/home.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { AddQuizComponent } from './pages/add-quiz/add-quiz.component';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './pages/search/search.component';
import { QuizesComponent } from './pages/quizes/quizes.component';
import { QuizCardComponent } from './components/quiz-card/quiz-card.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        CdkMenuModule,
        MatSlideToggleModule,
        MatIconModule,
        MatSnackBarModule,
        MatCardModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [MatSnackBar],
      declarations: [
        AppComponent,
        HomeComponent,
        QuizComponent,
        AddQuizComponent,
        LoginComponent,
        RegisterComponent,
        NavbarComponent,
        LoadingComponent,
        QuizCardComponent,
        QuizesComponent,
        SearchComponent,
      ],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Quiz App'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Quiz App');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
  });
});
