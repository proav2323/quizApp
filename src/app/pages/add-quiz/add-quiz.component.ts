import { AuthService } from './../../services/auth.service';
import { question } from './../../models/question';
import { option } from './../../models/option';
import { CategoryService } from './../../services/category.service';
import { QuizService } from './../../services/quiz.service';
import { Component, WritableSignal, effect, signal } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent {
  questions: question[] = [];
  options: option[] = [];
  user: user | null = null;
  errors: WritableSignal<string> = signal('');
  error: string = '';
  loading: boolean = false;
  isAddQuestionForm: WritableSignal<boolean> = signal(false);
  addQuestionForm: boolean = false;
  categorioes: { name: string; value: string }[] = [];
  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });
  constructor(
    private QuizService: QuizService,
    private CategoryService: CategoryService,
    private AuthService: AuthService
  ) {
    this.categorioes = this.CategoryService.categoryies();
    effect(() => {
      this.addQuestionForm = this.isAddQuestionForm();
      this.error = this.errors();
      this.loading = this.QuizService.loading();
      this.user = this.AuthService.user();
    });
  }
  setaddQuestionForm() {
    this.isAddQuestionForm.update((value) => !value);
  }
  addOption(form: NgForm) {
    console.log(form.value);
    const option: option = {
      name: form.value.option,
      isCorrectAnswer: form.value.isCorrectAnswer,
    };
    this.options.push(option);
  }
  deleteOption(option: option) {
    this.options = this.options.filter((x) => x !== option);
  }
  addQuestion(f: NgForm) {
    if (this.options.length > 1) {
      const question: question = {
        question: f.value.question,
        options: this.options,
      };
      this.questions.push(question);
      this.options = [];
    } else {
      this.errors.set('there should be two options');
    }
  }
  deletequestion(q: question) {
    this.questions = this.questions.filter((x) => x !== q);
  }
  async addQuiz() {
    if (this.formGroup.valid && this.questions.length !== 0 && this.user) {
      await this.QuizService.addQuiz(
        this.formGroup.controls['name'].value!,
        this.formGroup.controls['description'].value!,
        this.questions,
        this.formGroup.controls['category'].value!,
        this.user.id,
        this.errors
      );
    } else if (this.user === null) {
      this.errors.set('you need login to add quiz');
    } else if (this.questions.length === 0) {
      this.errors.set('there should be one question');
    } else {
      this.errors.set('fill the fields');
    }
  }
}
