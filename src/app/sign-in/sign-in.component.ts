import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { IUserCredentials } from '../models/user';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  standalone: true,
 imports: [FormsModule,CommonModule],
 templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
  
})

export class SignInComponent  implements OnInit{

  email : string = '';
  password : string = '';  
  constructor(private userService: UserService, private router: Router) { }
  ngOnInit(): void {
  }
  login() {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    this.userService.login(this.email,this.password);
    
    this.email = '';
    this.password = '';

  }
 

  signInWithGoogle() {
    this.userService.googleSignIn();
  }
   
}
