import { Component } from '@angular/core';
import { Product } from '../models/Product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProductDetailsComponent } from "../product-details-component/product-details-component.component";
import { ProductService } from '../product.service';  
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'app-catalog-component',
    standalone: true,
    templateUrl: './catalog-component.component.html',
    styleUrl: './catalog-component.component.css',
    imports: [RouterOutlet, CommonModule, FormsModule, ProductDetailsComponent, HeaderComponent]
})
  export class CatalogComponent {

    products : Product[]=[];

  isLowStock(quantity: number): boolean {
    return quantity < 5;

  }
  showDetails: boolean = false;
  
 

    toggleDetails() {
      this.showDetails = !this.showDetails;
    }


    
  constructor(private productService: ProductService) { }
  ngOnInit() {
    this.products = this.productService.getProducts();
  }

  

  }