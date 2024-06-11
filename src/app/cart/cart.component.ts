import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { Observable, of } from 'rxjs';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../cart.service';
import { FormsModule } from '@angular/forms';
import { CatalogComponent } from '../catalog-component/catalog-component.component';
import { ProductDetailsComponent } from '../product-details-component/product-details-component.component';
import { UserService } from '../user.service'; // Import UserService
import { ProductService } from '../product.service';
import { OrderService } from '../order.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';
import { OrderConfirmationComponent } from '../order-confirmation/order-confirmation.component';
import { OrderStatusComponent } from "../order-status/order-status.component";

@Component({
    selector: 'app-cart',
    standalone: true,
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    imports: [CurrencyPipe, CommonModule, FormsModule, CatalogComponent, ProductDetailsComponent, OrderStatusComponent]
})
export class CartComponent implements OnInit {

  public cart: Product[] = [];
  userCart$: Observable<Product[]> = of([]);
  userId: string='';
  total: number = 0;
  orderId: string ='';

  constructor(private cartService: CartService, private userService: UserService,private productService:ProductService, private orderService: OrderService,private router: Router) { }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.cartService.getCart(this.userId).subscribe(cart => {
          this.cart = cart;
          this.cart = cart.map(product => ({ ...product, showDetails: false }));
          this.calculateTotal();

        });
      }
    });
    
    this.orderService.getLastOrderId(this.userId).subscribe(orderId => {
      this.orderId = orderId; // Mettre à jour l'ID de la commande
    });
  }



  updateQuantity(productId: string, quantity: number): void {
    const product = this.cart.find(p => p.id === productId);
    if (product && quantity > 0) {
      product.quantity = quantity;
      this.cartService.updateQuantity(this.userId, productId, quantity).then(() => {
        this.calculateTotal();
      });
    }
  }

  onQuantityChange(event: Event, productId: string): void {
    const inputElement = event.target as HTMLInputElement;
    const quantity = parseInt(inputElement.value, 10);
    if (quantity > 0) {
      this.updateQuantity(productId, quantity);
    }
  }



  calculateTotal(): void {
    this.total = this.cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  }




  showDetails: boolean = false;

  toggleDetails(product: Product): void {
    product.showDetails = !product.showDetails;
  }


  get cartItems() {
    return this.cart;
  }

  removeProduct(productId: string): void {
    this.cartService.removeFromCart(this.userId, productId).catch(error => {
      console.error('Error removing product from cart: ', error);
    });
  }
  

  getImageUrl(product: Product): string {
    return `/assets/${product.imageUrl}`;
  }

  

  placeOrder(): void {
    const order: Order = {
      id: '', 
      userId: this.userId, 
      products: this.cart.map(product => ({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity
      })),
      totalAmount: this.total, 
      status: 'Pending', 
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.orderService.createOrder(order).then((docRef) => {
      // Décrémenter les quantités de produits dans la base de données
      this.cart.forEach(product => {
        this.productService.updateProductQuantity(product.id, product.quantity);
      });

      // Redirigez l'utilisateur vers la page de confirmation de commande
      this.router.navigate(['/order-confirmation', docRef.id]);
    }).catch(error => {
      console.error('Error placing order: ', error);
    });
  }


  viewOrderStatus(): void {
    // Vérifier si l'ID de la commande est défini
    if (this.orderId) {
      // Rediriger l'utilisateur vers la page de statut de la commande avec l'ID de la commande
      this.router.navigate(['/order-status', this.orderId]);
    } else {
      // Gérer le cas où l'ID de la commande n'est pas défini
      console.error('ID de commande non disponible');
      // Afficher un message à l'utilisateur ou effectuer une action appropriée
    }
  }
}