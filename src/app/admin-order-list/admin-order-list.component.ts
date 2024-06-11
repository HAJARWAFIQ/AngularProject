import { Component, OnInit } from '@angular/core';
import { OrderService } from "../order.service";
import { Order } from '../models/order';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin-order-list',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './admin-order-list.component.html',
  styleUrl: './admin-order-list.component.css'
})
export class AdminOrderListComponent {


  orders$: Observable<Order[]>;

  constructor(private orderService: OrderService) {
    this.orders$ = new Observable<Order[]>();
  }

  ngOnInit(): void {
    this.orders$ = this.orderService.getPendingOrders();
  }

  acceptOrder(orderId: string): void {
    this.orderService.acceptOrder(orderId).then(() => {
      alert('Commande acceptée');
    }).catch(error => {
      console.error('Erreur lors de l\'acceptation de la commande :', error);
      alert('Échec de l\'acceptation de la commande.');
    });
  }

  rejectOrder(orderId: string): void {
    this.orderService.rejectOrder(orderId).then(() => {
      alert('Commande rejetée');
    }).catch(error => {
      console.error('Erreur lors du rejet de la commande :', error);
      alert('Échec du rejet de la commande.');
    });
  }

 
}
