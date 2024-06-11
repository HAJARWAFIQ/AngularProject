
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Order } from "./models/order";
import { Observable } from 'rxjs';
import { doc, setDoc, DocumentReference, Firestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  
  private ordersCollection = this.firestore.collection<Order>('orders');

  constructor(private firestore: AngularFirestore) {}

  getOrdersByUser(userId: string): Observable<Order[]> {
    return this.firestore.collection<Order>('orders', ref => ref.where('userId', '==', userId)).valueChanges({ idField: 'id' });
  }

  getAllOrders(): Observable<Order[]> {
    return this.ordersCollection.valueChanges({ idField: 'id' });
  }

  getOrderById(orderId: string): Observable<Order | undefined> {
    return this.ordersCollection.doc(orderId).valueChanges({ idField: 'id' });
  }
  async createOrder(order: Order): Promise<DocumentReference<Order>> {
    const id = this.firestore.createId();
    const newOrderRef = doc(this.ordersCollection.ref, id); // Utilisation correcte des méthodes Firebase v9
    await setDoc(newOrderRef, { ...order, id });
    return newOrderRef;
  }
  updateOrder(order: Order): Promise<void> {
    return this.ordersCollection.doc(order.id).update(order);
  }

  deleteOrder(orderId: string): Promise<void> {
    return this.ordersCollection.doc(orderId).delete();
  }

  acceptOrder(orderId: string): Promise<void> {
    return this.ordersCollection.doc(orderId).update({ status: 'Accepted' });
  }

  rejectOrder(orderId: string): Promise<void> {
    return this.ordersCollection.doc(orderId).update({ status: 'Rejected' });
  }
  getPendingOrders(): Observable<Order[]> {
    return this.firestore.collection<Order>('orders', ref => ref.where('status', '==', 'Pending')).valueChanges({ idField: 'id' });
  }
  getLastOrderId(userId: string): Observable<string> {
    return this.firestore.collection<Order>('orders', ref => ref.where('userId', '==', userId).orderBy('createdAt', 'desc').limit(1))
      .valueChanges()
      .pipe(
        // Spécifier le type de orders comme un tableau d'Order
        map((orders: Order[]) => orders.length > 0 ? orders[0].id : '')
      );
  }
  }

