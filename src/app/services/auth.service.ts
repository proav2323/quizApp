import { Injectable, WritableSignal, effect, signal } from '@angular/core';
import { user } from '../models/user';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from 'src/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: WritableSignal<user | null> = signal<user | null>(null);
  constructor() {}

  getUser() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const unsub = onSnapshot(doc(db, 'users', uid), (doc) => {
          this.user.set(doc.data() as user);
        });
      } else {
      }
    });
  }
  login(email: string, password: string) {}
  register(email: string, password: string, name: string) {}
}
