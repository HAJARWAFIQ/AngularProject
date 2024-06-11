import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ProductService } from '../product.service'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule,CommonModule,],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent  implements OnInit {

onsubmit() {
  this.productService.updateProduct(this.productId, this.product)
  .then(() => {
    console.log('Produit mis à jour avec succès');
    this.router.navigate(['/catalog']); // Rediriger vers la liste des produits après la mise à jour
  })
  .catch((error: any) => {
    console.error('Erreur lors de la mise à jour du produit :', error);
  });
}


  productId: string = '';
  product: Product = {
    id: '',
    name: '',
    description: '',
    quantity: 0,
    price: 0,
    imageUrl: '',
    category:''
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {  }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.getProduct();
    
  }

  getProduct(): void {
    this.productService.getProductById(this.productId)
      .subscribe((product: Product | null) => {
        if (product !== null) {
          this.product = product;
        } else {
          console.error('Produit non trouvé');
        }
      });

}
}
