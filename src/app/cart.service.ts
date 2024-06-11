import { Injectable } from '@angular/core';
import { Product } from './models/Product';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private userCartCollectionName = 'userCart';

  constructor(private firestore: AngularFirestore,private productService: ProductService) {}

  getCart(userId: string): Observable<Product[]> {
    return this.firestore.collection<Product>(`${this.userCartCollectionName}/${userId}/products`).snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as Product;
            const productId = action.payload.doc.id; // Renommer id en productId
            return { productId, ...data };
          });
        })
      );
  }
  addToCart(userId: string, product: Product): Promise<void> {
    const cartRef = this.firestore.collection(`${this.userCartCollectionName}/${userId}/products`).doc(product.id);
    return cartRef.set(product)
      .then(() => {
        console.log("Product added to cart");
      })
      .catch(error => {
        console.error("Error adding product to cart:", error);
        throw error;
      });
  }

  removeFromCart(userId: string, productId: string): Promise<void> {
    const productRef = this.firestore.collection(`${this.userCartCollectionName}/${userId}/products`).doc(productId);
    return productRef.delete()
      .then(() => {
        console.log("Product removed from cart");
        return firstValueFrom(this.productService.getProductById(productId)); // Utiliser firstValueFrom pour convertir Observable en Promise
      })
      .then((product: Product | null) => {
        if (product) {
          return this.productService.updateProductQuantity(productId, product.quantity + 1);
        } else {
          throw new Error("Product not found in catalog");
        }
      })
      .catch(error => {
        console.error("Error removing product from cart:", error);
        throw error;
      });
  }

  updateCartOnServer(userId: string, cart: Product[]): Promise<void> {
    const userCartRef = this.firestore.collection(this.userCartCollectionName).doc(userId);
    return userCartRef.set({ products: cart }, { merge: true })
      .then(() => console.log("Cart updated on server"))
      .catch(error => {
        console.error("Error updating cart on server:", error);
        throw error;
      });
  }

    // Nouvelle méthode pour mettre à jour la quantité de produit dans le panier
    updateQuantity(userId: string, productId: string, quantity: number): Promise<void> {
      const cartRef = this.firestore.collection(`${this.userCartCollectionName}/${userId}/products`).doc(productId);
      return cartRef.update({ quantity: quantity })
        .then(() => {
          console.log("Product quantity updated in cart");
        })
        .catch(error => {
          console.error("Error updating product quantity in cart:", error);
          throw error;
        });
    }
}