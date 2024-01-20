import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { AddQuizComponent } from './pages/add-quiz/add-quiz.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './components/loading/loading.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { QuizCardComponent } from './components/quiz-card/quiz-card.component';
import { MatCardModule } from '@angular/material/card';
import { QuizesComponent } from './pages/quizes/quizes.component';
import { SearchComponent } from './pages/search/search.component';
import { MatTabsModule } from '@angular/material/tabs';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule,
} from '@angular/material/dialog';
@NgModule({
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
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    CdkMenuModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
