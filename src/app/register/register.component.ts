import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { UserService } from '../user.service';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  implements OnInit {
  email : string = '';
  password : string = '';

  constructor(private userService : UserService,private router: Router) { }

  ngOnInit(): void {
  }

  register() {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    this.userService.register(this.email,this.password);
    
    this.email = '';
    this.password = '';

  }

}
