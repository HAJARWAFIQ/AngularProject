import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { Observable} from 'rxjs';



@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
 
  newProduct: Product = {
    id: '', // Laissez-le vide pour le moment, il sera généré automatiquement ou peut-être défini par l'utilisateur
    name: '',
    description: '',
    quantity: 0,
    price: 0,
    imageUrl: '',
    category:''
  };
  
  constructor(private productService: ProductService, private router: Router) {
   }
  ngOnInit(): void {
   
  }

 onSubmit(): void {
    this.productService.addProduct(this.newProduct)
      .then(() => {
        console.log('Produit ajouté avec succès');
        this.router.navigate(['/catalog']); // Rediriger vers la liste des produits après l'ajout
      })
      .catch((error: any) => {
        console.error('Erreur lors de l\'ajout du produit :', error);
      });
  }

}
