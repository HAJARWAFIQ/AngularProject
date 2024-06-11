import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from '@angular/router';
import { Order } from '../models/order';
import { OrderService } from '../order.service';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css'
})
export class OrderConfirmationComponent implements OnInit{


  orderId: string = '';
  order: Order | undefined;

  constructor(private route: ActivatedRoute, private orderService: OrderService,private invoiceService:InvoiceService,private router: Router) { }

  ngOnInit(): void {
    // Récupérez l'ID de la commande depuis les paramètres de l'URL
    this.route.paramMap.subscribe(params => {
      const orderId = params.get('id');
      if (orderId) {
          // Utilisez l'ID pour récupérer les détails de la commande depuis la base de données
          this.orderService.getOrderById(orderId).subscribe(order => {
              this.order = order;
          });
      }
  });
  }

  confirmOrder(): void {
    if (this.order) {
      // Logique de confirmation de la commande
      this.order.status = 'Pending';
      this.orderService.updateOrder(this.order).then(() => {
        alert('Votre commande a été envoyée pour validation.');
        this.router.navigate(['/order-status', this.order?.id]);
      }).catch(error => {
        console.error('Erreur lors de la confirmation de la commande :', error);
        alert('Erreur lors de la confirmation de la commande.');
      });
    }
  }


  viewOrderStatus(): void {
    // Rediriger l'utilisateur vers la page de statut de la commande en fonction de l'ID de commande associé
    this.router.navigate(['/order-status', this.orderId]); // Remplacez 'orderId' par l'identifiant réel de la commande associée à l'utilisateur
  }
  downloadInvoice(): void {
    if (this.order) {
      this.invoiceService.generateInvoice(this.order);
    }
  }

}
