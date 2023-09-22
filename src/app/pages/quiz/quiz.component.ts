import { ActivatedRoute } from '@angular/router';
import { Component, WritableSignal, effect, signal } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { quiz } from 'src/app/models/quiz';
import { question } from 'src/app/models/question';
import { option } from 'src/app/models/option';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  isGameOverSignal: WritableSignal<boolean> = signal(false);
  isGameOver: boolean = false;
  isQuestionDoneSignal: WritableSignal<boolean> = signal(false);
  isQuestionDone: boolean = false;
  chosenOption: option | null = null;
  chosenOptionSignal: WritableSignal<option | null> = signal(null);
  quiz: quiz | null = null;
  questions: question[] = [];
  questionSignal: WritableSignal<question | null> = signal(null);
  question: question | null = null;
  scoreSignal: WritableSignal<number> = signal(0);
  score: number = 0;
  timer: number = 60;
  timerSignal: WritableSignal<number> = signal(60);
  timerInt: any;
  total: number = 0;
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private quizService: QuizService
  ) {
    this.timerInt = setInterval(() => {
      this.timerSignal.update((data) => data - 1);
      if (this.timer === 0 && this.question) {
        this.next(this.question);
      }
    }, 1000);
    this.ActivatedRoute.queryParams.subscribe((data) => {
      if (data['id']) {
        this.quizService.getQuizById(data['id']);
      }
    });
    effect(
      async () => {
        this.timer = this.timerSignal();
        this.score = this.scoreSignal();
        this.isGameOver = this.isGameOverSignal();
        this.isQuestionDone = this.isQuestionDoneSignal();
        this.chosenOption = this.chosenOptionSignal();
        this.question = this.questionSignal();
        this.quiz = this.quizService.quiz();
        if (this.quizService.quiz() !== null) {
          if (this.questions.length === 0) {
            this.questions = this.quizService.quiz()!.questions;
            this.total = this.questions.length;
          }
          if (this.question === null) {
            this.pickRandomQuestion();
          }
        }
      },
      { allowSignalWrites: true }
    );
  }
  pickRandomQuestion() {
    if (this.questions.length !== 0) {
      let randomIndex: number = Math.floor(
        Math.random() * (this.questions.length - 1)
      );
      this.questionSignal.set(this.questions[randomIndex]);
      console.log(this.questions[randomIndex]);
    } else {
      this.isGameOverSignal.set(true);
      clearInterval(this.timerInt);
    }
  }
  choseOption(option: option) {
    this.chosenOptionSignal.set(option);
  }
  done() {
    if (this.chosenOption !== null && !this.isQuestionDone) {
      if (this.chosenOption.isCorrectAnswer) {
        this.scoreSignal.update((data) => data + 1);
      }
      this.isQuestionDoneSignal.set(true);
      clearInterval(this.timerInt);
    }
  }
  next(question: question) {
    this.questions = this.questions.filter((data) => data !== question);
    console.log(this.questions);
    this.chosenOptionSignal.set(null);
    this.isQuestionDoneSignal.set(false);
    this.pickRandomQuestion();
    this.timerSignal.set(60);
    this.timerInt = setInterval(() => {
      this.timerSignal.update((data) => data - 1);
      if (this.timer === 0 && this.question) {
        this.next(this.question);
      }
    }, 1000);
  }
  restart() {
    this.isGameOverSignal.set(false);
    if (this.quiz !== null) {
      this.questions = this.quiz.questions;
    }
    this.isQuestionDoneSignal.set(false);
    this.timerSignal.set(60);
    this.chosenOptionSignal.set(null);
    clearInterval(this.timerInt);
    this.scoreSignal.set(0);
    this.timerInt = setInterval(() => {
      this.timerSignal.update((data) => data - 1);
      if (this.timer === 0 && this.question) {
        this.next(this.question);
      }
    }, 1000);
    this.pickRandomQuestion();
  }
}
