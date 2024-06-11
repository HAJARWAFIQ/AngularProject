import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/Product';
import { catchError, map, Observable, of ,combineLatest} from 'rxjs';
import { CommonModule } from '@angular/common'; // Import de CommonModule
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  }




