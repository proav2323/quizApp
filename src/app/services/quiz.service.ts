import { AlogoliaService } from './alogolia.service';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { quiz } from '../models/quiz';
import { question } from '../models/question';
import { v4 } from 'uuid';
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from 'src/firebase';
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  quizs: WritableSignal<quiz[]> = signal([]);
  quiz: WritableSignal<quiz | null> = signal(null);
  loading: WritableSignal<boolean> = signal(false);
  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private AlogoliaService: AlogoliaService
  ) {}

  async addQuiz(
    name: string,
    descriction: string,
    questions: question[],
    category: string,
    userId: string,
    error: WritableSignal<string>
  ) {
    this.loading.set(true);
    const id = v4();
    await setDoc(doc(db, 'quizes', id), {
      name: name,
      description: descriction,
      category: category,
      questions: questions,
      craetedBy: userId,
      id: id,
    })
      .then((data) => {
        this.snackbar.open('quiz added', 'close');
        const quiz = {
          name: name,
          description: descriction,
          category: category,
          questions: questions,
          craetedBy: userId,
          id: id,
        };
        this.AlogoliaService.addQuiz(quiz);
        this.router.navigateByUrl('/');
        this.loading.set(false);
      })
      .catch((data) => {
        error.set(data.message);
        this.loading.set(false);
      });
  }
  getAllQuiz() {
    const q = query(collection(db, 'quizes'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities: quiz[] = [];
      querySnapshot.forEach((doc) => {
        cities.push(doc.data() as quiz);
      });
      this.quizs.set(cities);
    });
  }
  getCategoryQuizes(category: string) {
    const q = query(
      collection(db, 'quizes'),
      where('category', '==', category)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities: quiz[] = [];
      querySnapshot.forEach((doc) => {
        cities.push(doc.data() as quiz);
      });
      this.quizs.set(cities);
    });
  }
  async getSearchedQuizes(search: string) {
    const data = await this.AlogoliaService.serachQuizes(search);
    this.quizs.set(data);
  }
}
