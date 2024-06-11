import { Component, OnInit } from '@angular/core';
import { CatalogComponent } from '../catalog-component/catalog-component.component';
import { Router, RouterLink } from '@angular/router';
import { IUser } from '../models/user';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { ProductService } from '../product.service';





@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CatalogComponent,RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  user: IUser | null = null;
  showSignOutMenu: boolean = false;

  loggedIn: BehaviorSubject<boolean>;
  currentUser: BehaviorSubject<firebase.User | null>;
  isAdmin: BehaviorSubject<boolean>; // Ajoutez cette ligne

  categories$: Observable<string[]>= of([]);;
  constructor( public userService: UserService,private productService: ProductService,private router: Router){
    this.loggedIn = this.userService.loggedIn;
    this.currentUser = this.userService.currentUser;
    this.isAdmin = this.userService.isAdmin; 
  }

ngOnInit() {
  
  }
 
  toggleSignOutMenu() {
    this.showSignOutMenu = !this.showSignOutMenu;
  }
  logout() {
    this.userService.logout();
  }
  
 
}
