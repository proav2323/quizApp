import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { AddQuizComponent } from './pages/add-quiz/add-quiz.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './gaurds/auth.guard';
import { SearchComponent } from './pages/search/search.component';
import { QuizesComponent } from './pages/quizes/quizes.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'addQuiz', component: AddQuizComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent },
  { path: 'quizes', component: QuizesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
