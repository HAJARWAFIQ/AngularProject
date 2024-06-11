import { inject, Injectable, Query } from '@angular/core';
import { Product } from './models/Product';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { catchError, map, Observable, of,tap } from 'rxjs';
import { collection, Firestore, query, QueryDocumentSnapshot } from 'firebase/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HttpClient } from '@angular/common/http';
import { collectionData } from '@angular/fire/firestore';
import firebase from 'firebase/compat/app';
import { Promotion } from './models/promotion';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsCollection: AngularFirestoreCollection<Product>;
  private categoriesCollectionName = 'categories';

  constructor(private firestore: AngularFirestore) {
    this.productsCollection = this.firestore.collection<Product>('products');
  }

// CREATE: Ajouter un nouveau produit
addProduct(product: Product): Promise<void> {
  // Générer un ID unique pour le nouveau produit
  const id = this.firestore.createId();
  // Ajouter le produit à la collection avec l'ID généré
  return this.productsCollection.doc(id).set({ ...product, id });
}


// UPDATE: Mettre à jour un produit existant
updateProduct(productId: string, newData: Partial<Product>): Promise<void> {
  // Mettre à jour les données du produit dans la collection avec l'ID spécifié
  return this.productsCollection.doc(productId).update(newData);
}

// DELETE: Supprimer un produit
deleteProduct(productId: string): Promise<void> {
  // Supprimer le produit de la collection avec l'ID spécifié
  return this.productsCollection.doc(productId).delete();
}


getProducts(): Observable<Product[]> {
  return this.productsCollection.valueChanges({ idField: 'id' }).pipe(
    map(products => products.filter(product => product.quantity > 0))
  );
}

  getProductById(productId: string): Observable<Product | null> {
    return this.productsCollection.doc(productId).valueChanges().pipe(
      map((product: Product | undefined) => product ?? null), // Transform undefined to null
      catchError((error: any) => {
        console.error('Error fetching product:', error);
        return of(null); // Return an observable of null in case of error
      })
    );
  }

  debugProducts(): void {
    this.getProducts().subscribe(
      products => {
        console.log('Produits récupérés avec succès :', products);
      },
      error => {
        console.error('Erreur lors de la récupération des produits :', error);
      }
    );
  }

  buy(product: Product): void {
    if (product.quantity > 0) {
      product.quantity--; // Décrémenter la quantité
      if (product.quantity < 5) {
        alert("Quantité restante inférieure à 5 !"); // Alerte lorsque la quantité est inférieure à 5
      }
    } else {
      alert("Produit épuisé !");
    }
  }


  addCategory(category: string): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection(this.categoriesCollectionName).doc(id).set({ name: category });
  }

  updateProductQuantity(productId: string, quantity: number): Promise<void> {
    return this.firestore.collection('products').doc(productId).update({
      quantity: firebase.firestore.FieldValue.increment(-quantity)
    });
  }

  
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.firestore.collection<Product>('products', ref => ref.where('category', '==', category)).valueChanges({ idField: 'id' });
  }



  addPromotion(productId: string, promotion: Promotion): Promise<void> {
    return this.firestore.collection('products').doc(productId).update({
      promotion: promotion
    });
  }

  // Supprimer la promotion d'un produit
  removePromotion(productId: string): Promise<void> {
    return this.firestore.collection('products').doc(productId).update({
      promotion: null
    });
  }


}
