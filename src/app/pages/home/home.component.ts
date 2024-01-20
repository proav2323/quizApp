import { quiz } from 'src/app/models/quiz';
import { QuizService } from './../../services/quiz.service';
import { Component, effect } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  quizes: quiz[] = [];
  constructor(private QuizService: QuizService) {
    this.QuizService.quizs.set([]);
    this.QuizService.getAllQuiz();
    effect(() => {
      this.quizes = this.QuizService.quizs();
    });
  }
}
