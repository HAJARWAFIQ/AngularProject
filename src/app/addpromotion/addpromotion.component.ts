import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../models/Product';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Promotion } from '../models/promotion';


@Component({
  selector: 'app-addpromotion',
  standalone: true,
  imports: [CommonModule ,FormsModule],
  templateUrl: './addpromotion.component.html',
  styleUrl: './addpromotion.component.css'
})
export class AddpromotionComponent implements OnInit {
  productId: string = '';
  promotion: Promotion = {
    price: 0,
    startDate: new Date(),
    endDate: new Date(),
    description: ''
  };

  constructor(private productService: ProductService, private router: Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: { [key: string]: string }) => {
      this.productId = params['id'];
    });
  }
  addPromotion(): void {
    this.productService.addPromotion(this.productId, this.promotion)
      .then(() => {
        console.log('Promotion added successfully');
        this.router.navigate(['/catalog']);
      })
      .catch(error => {
        console.error('Error adding promotion:', error);
      });
  }

  // Supprimer la promotion d'un produit sélectionné


 }
  

  
