import { Injectable, WritableSignal, effect, signal } from '@angular/core';
import { user } from '../models/user';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from 'src/firebase';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { RegisterComponent } from '../pages/register/register.component';
import { LoginComponent } from '../pages/login/login.component';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: WritableSignal<user | null> = signal<user | null>(null);
  loading: WritableSignal<boolean> = signal(false);
  constructor(private router: Router, private snackbar: MatSnackBar) {}

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
  login(
    email: string,
    password: string,
    errorS: WritableSignal<string>,
    dailogRef: MatDialogRef<LoginComponent>
  ) {
    this.loading.set(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const unsub = onSnapshot(doc(db, 'users', user.uid), (doc) => {
          this.user.set(doc.data() as user);
          this.router.navigateByUrl('/');
          this.loading.set(false);
          dailogRef.close();
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          this.snackbar.open('invalid credentails', 'close');
          this.loading.set(false);
        } else if (errorCode === 'auth/user-not-found') {
          this.snackbar.open('user not found with this email', 'close');
          this.loading.set(false);
        } else if (errorCode === 'auth/invalid-login-credentials') {
          this.snackbar.open('invalid-credentials', 'close');
          this.loading.set(false);
        } else {
          this.snackbar.open(errorMessage, 'close');
          this.loading.set(false);
        }
      });
  }
  async register(
    email: string,
    password: string,
    name: string,
    errorS: WritableSignal<string>,
    dailogRef: MatDialogRef<RegisterComponent>
  ) {
    this.loading.set(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await setDoc(doc(db, 'users', user.uid), {
          name: name,
          email: email,
          id: user.uid,
        })
          .then(() => {
            const unsub = onSnapshot(doc(db, 'users', user.uid), (doc) => {
              this.user.set(doc.data() as user);
              this.router.navigateByUrl('/');
              this.loading.set(false);
              dailogRef.close();
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
          this.snackbar.open('user found with this email', 'close');
          this.loading.set(false);
        } else {
          this.snackbar.open(errorMessage, 'close');
          this.loading.set(false);
        }
      });
  }
  async getUserWithId(id: string): Promise<user> {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as user;
  }
}
