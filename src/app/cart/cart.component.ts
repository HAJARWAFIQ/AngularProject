import { Component } from '@angular/core';
import { Product } from '../models/Product';
import { ProductService } from '../product.service'; 

import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  
    

  cartItems: Product[] = [];

}


