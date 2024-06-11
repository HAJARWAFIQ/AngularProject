import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from '../catalog-component/catalog-component.component';
import { ProductDetailsComponent } from "../product-details-component/product-details-component.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-categorie',
    standalone: true,
    templateUrl: './categorie.component.html',
    styleUrl: './categorie.component.css',
    imports: [CommonModule, CatalogComponent, ProductDetailsComponent,RouterModule]
})
export class CategorieComponent {

  userId: string = '';
  
 public products : Product[]=[];
  isAdmin: Observable<boolean> | undefined;
  @ViewChild('buyButton')
   buyButton!: TemplateRef<any>;
   @Input()
   myValue : string = "";
   filter: string = ""
   lowStockThreshold: number = 5; 
   category: string | null = null;
  
   product: any;
   filteredProducts:Product[]=[];
  
   products$!: Observable<Product[]>;
   showDetails: boolean = false;
   
  constructor(private productService: ProductService, 
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category');
      if (this.category) {
        this.filterByCategory(this.category);
      }
    });

    this.isAdmin = this.userService.isAdmin;
    this.productService.getProducts().subscribe(products => {
      this.products = products.filter(product => product.quantity > 0);
      });
      this.userService.currentUser.subscribe(user => {
        if (user) {
          this.userId = user.uid;
        }
      });
      this.route.paramMap.subscribe(params => {
        this.category = params.get('category');
        if (this.category) {
          this.products$ = this.productService.getProductsByCategory(this.category);
        } else {
          this.products$ = this.productService.getProducts();
        }
      });

      this.productService.getProducts().subscribe(data => {
        this.products = data.map(product => ({ ...product, showDetails: false }));
      });
  }
 
  filterByCategory(category: string): void {
    this.productService.getProductsByCategory(category).subscribe(products => {
      this.products = products;
      this.filteredProducts = [...this.products];
    });
  }
  /******************************************** */
  editProduct(productId: string): void {
    this.router.navigate(['/edit-product', productId]);
  }
  deleteProduct(productId: string): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      this.productService.deleteProduct(productId).then(() => {
        // Supprimer le produit de la liste des produits affichés
        this.products = this.products.filter(product => product.id !== productId);
      }).catch(error => {
        console.error("Erreur lors de la suppression du produit :", error);
      });
    }
  }
  addToCart(product: Product) {
    if (this.userId) {
      this.cartService.addToCart(this.userId, product).then(() => {
        // Mettre à jour la quantité localement dans la liste de produits affichés
        const index = this.products.findIndex(p => p.id === product.id);
        if (index !== -1) {
          this.products[index].quantity--; // Décrémenter la quantité
        }
        // Naviguer vers la page du panier
        this.router.navigate(['/cart']);
      }).catch(error => {
        console.error('Error adding product to cart: ', error);
      });
    } else {
      console.error('User not logged in');
    }
  }
  removeFromCart(product: Product) {
    if (this.userId) {
      this.cartService.removeFromCart(this.userId, product.id).then(() => {
        // Mettre à jour la quantité localement dans la liste de produits affichés
        const index = this.products.findIndex(p => p.id === product.id);
        if (index !== -1) {
          this.products[index].quantity++; // Incrémenter la quantité
        }
      }).catch(error => {
        console.error('Error removing product from cart: ', error);
      });
    } else {
      console.error('User not logged in');
    }
  }
 



  isLowStock(quantity: number): boolean {
    return quantity < this.lowStockThreshold;
  }


  toggleDetails(product: Product): void {
    product.showDetails = !product.showDetails;
  }


  getFilteredProducts() {
    return this.filter === ''
      ? this.products
      : this.products.filter(
        (product: any) => product.category === this.filter
      );
  }






  isPromotionActive(promotion: any): boolean {
    const now = new Date();
    return promotion && new Date(promotion.startDate) <= now && new Date(promotion.endDate) >= now;
  }

  getDiscountedPrice(product: Product): number | null {
    if (product.promotion && this.isPromotionActive(product.promotion)) {
      return product.promotion.price;
    }
    return null;
  }

  getDiscountPercentage(product: Product): number {
    if (product.promotion && this.isPromotionActive(product.promotion)) {
      const discount = ((product.price - product.promotion.price) / product.price) * 100;
      return Math.round(discount);
    }
    return 0;
  }



  addPromotion(productId: string): void {
    this.router.navigate(['/add-promotion', productId]);
  }

  removePromotion(productId: string): void {
    if (confirm("Are you sure you want to remove the promotion for this product?")) {
      this.productService.removePromotion(productId).then(() => {
        this.products = this.products.map(product =>
          product.id === productId ? { ...product, promotion: null } : product
        );
      }).catch(error => {
        console.error("Error removing promotion:", error);
      });
    }
  }

}

