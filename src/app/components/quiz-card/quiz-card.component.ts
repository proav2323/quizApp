import { AuthService } from './../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { quiz } from 'src/app/models/quiz';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.css'],
})
export class QuizCardComponent implements OnInit {
  @Input() quiz!: quiz;
  user!: user;
  constructor(private AuthService: AuthService) {}
  async ngOnInit() {
    this.user = await this.AuthService.getUserWithId(this.quiz.craetedBy);
    console.log(this.user);
  }
}
