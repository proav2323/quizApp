import { Injectable } from '@angular/core';
import algoliasearch from 'algoliasearch';
import { quiz } from '../models/quiz';
@Injectable({
  providedIn: 'root',
})
export class AlogoliaService {
  client: any;
  constructor() {}
  insilizeAloglia() {
    this.client = algoliasearch(
      'JRXTMTNA3I',
      '45f8d77b53a1812ccdb23babde339da9'
    );
  }
  addQuiz(quiz: quiz) {
    const index = this.client.initIndex('quizes');
    const data = {
      objectID: quiz.id,
      name: quiz.name,
      description: quiz.description,
      category: quiz.category,
      questions: quiz.questions,
      craetedBy: quiz.craetedBy,
      id: quiz.id,
    };
    index.saveObject(data).wait();
  }
  async serachQuizes(search: string): Promise<quiz[]> {
    const index = this.client.initIndex('quizes');
    const data = await index.search(search);
    return data.hits;
  }
}
