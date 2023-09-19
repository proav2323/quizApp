import { QuizService } from 'src/app/services/quiz.service';
import { Component, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { quiz } from 'src/app/models/quiz';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  quizes: quiz[] = [];
  search: string = '';
  constructor(private route: ActivatedRoute, private QuizService: QuizService) {
    this.route.queryParams.subscribe((data) => {
      if (data['search']) {
        this.search = data['search'];
        this.QuizService.getSearchedQuizes(data['search']);
      }
    });
    effect(() => {
      this.quizes = this.QuizService.quizs();
    });
  }
}
