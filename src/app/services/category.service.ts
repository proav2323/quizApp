import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categoryies: WritableSignal<{ name: string; value: string }[]> = signal([
    { name: 'science', value: 'science' },
    { name: 'maths', value: 'maths' },
    { name: 'geography', value: 'geography' },
    { name: 'english', value: 'english' },
    { name: 'social studies', value: 'social studies' },
    { name: 'general knowledge', value: 'general knowledge' },
    { name: 'french', value: 'french' },
  ]);
  constructor() {}
}
