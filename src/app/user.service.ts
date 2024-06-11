import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IUser, IUserCredentials } from './models/user';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';



@Injectable({
  providedIn: 'root'
  
})
export class UserService {


  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUser: BehaviorSubject<firebase.User | null> = new BehaviorSubject<firebase.User | null>(null);
  constructor(private fireauth : AngularFireAuth, private router : Router) {
    this.fireauth.authState.subscribe(user => {
      this.loggedIn.next(!!user);
      if (user) {
        this.checkUserRole(user);
        this.currentUser.next(user);
      }
    });
   }

  
  getCurrentUserId(): string | null {
    return this.currentUser.value?.uid || null;
  }
 
   checkUserRole(user: firebase.User | null): void {
    const isAdmin = user?.email === 'wafiqhajaar@gmail.com'; // Remplacez 'admin@example.com' par l'email de votre admin
    this.isAdmin.next(isAdmin || false);
  }



  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then (()=> {
        localStorage.setItem('token','true');
          this.router.navigate(['/catalog']);

    }, err => {
        alert(err.message);
        this.router.navigate(['/login']);
    })
  }

  register(email : string, password : string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      alert('Registration Successful');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  logout() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }


  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

      this.router.navigate(['/catalog']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));

    }, err => {
      alert(err.message);
    })
  }


  }
  


  