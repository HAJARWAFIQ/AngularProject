import { Component, Input } from '@angular/core';
import { Product } from '../models/Product';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-product-details-component',
  standalone: true,
  imports: [],
  templateUrl: './product-details-component.component.html',
  styleUrl: './product-details-component.component.css'
})

export class ProductDetailsComponent {
  @Input() product!: Product; // Déclaration de la propriété `product` pour recevoir les données du produit
  


  constructor() { }
}
