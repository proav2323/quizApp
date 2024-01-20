import { Component, effect, WritableSignal, signal } from '@angular/core';
import { quiz } from 'src/app/models/quiz';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import { Tabs } from 'flowbite';
import type { TabsOptions, TabsInterface, TabItem } from 'flowbite';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.css'],
})
export class QuizesComponent {
  categories: { name: string; value: string }[] = [];
  quizes: quiz[] = [];
  categoryS: WritableSignal<string> = signal('science');
  category: string = 'science';
  constructor(
    private QuizService: QuizService,
    private categoriesService: CategoryService
  ) {
    this.QuizService.quizs.set([]);
    this.QuizService.getCategoryQuizes(this.category);
    effect(() => {
      this.categories = this.categoriesService.categoryies();
      this.quizes = this.QuizService.quizs();
      this.category = this.categoryS();
    });
  }
  getCategoryQuizes(category: string) {
    this.QuizService.getCategoryQuizes(category);
    this.categoryS.set(category);
  }
}
