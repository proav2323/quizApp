import { Injectable, WritableSignal, effect, signal } from '@angular/core';
import { user } from '../models/user';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from 'src/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: WritableSignal<user | null> = signal<user | null>(null);
  loading: WritableSignal<boolean> = signal(false);
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
  login(email: string, password: string, errorS: WritableSignal<string>) {
    this.loading.set(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const unsub = onSnapshot(doc(db, 'users', user.uid), (doc) => {
          this.user.set(doc.data() as user);
          this.loading.set(false);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          errorS.set('wrong password for the user');
          this.loading.set(false);
        } else if (errorCode === 'auth/user-not-found') {
          errorS.set('user not found with this email');
          this.loading.set(false);
        } else if (errorCode === 'auth/invalid-login-credentials') {
          errorS.set('invalid-login-credentials');
          this.loading.set(false);
        } else {
          errorS.set(errorMessage);
          this.loading.set(false);
        }
      });
  }
  async register(
    email: string,
    password: string,
    name: string,
    errorS: WritableSignal<string>
  ) {
    this.loading.set(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await setDoc(doc(db, 'users', user.uid), {
          name: name,
          email: email,
        })
          .then(() => {
            const unsub = onSnapshot(doc(db, 'users', user.uid), (doc) => {
              this.user.set(doc.data() as user);
              this.loading.set(false);
            });
          })
          .catch((err) => {
            const errorMessage = err.message;
            errorS.set(errorMessage);
            this.loading.set(false);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/user-found') {
          errorS.set('user found with this email');
          this.loading.set(false);
        } else {
          errorS.set(errorMessage);
          this.loading.set(false);
        }
      });
  }
}
