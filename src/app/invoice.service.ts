import { Injectable } from '@angular/core';
import { Order } from './models/order';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

interface DocumentDefinition {
  content: any[]; // contenu du document
  styles?: any; // styles utilisés dans le document
  defaultStyle?: any; // style par défaut du document
}




@Injectable({
  providedIn: 'root'
})

export class InvoiceService {

  constructor() {}

  generateInvoice(order: Order): void {
    const documentDefinition: DocumentDefinition = {
      content: [
        { text: 'Facture', style: 'header' },
        { text: `Commande #${order.id}`, style: 'subheader' },
        { text: `Date de commande: ${order.createdAt}`, style: 'subheader' },
        { text: `Total: ${order.totalAmount} €`, style: 'subheader' },
        { text: 'Détails de la commande:', style: 'subheader' },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Produit', 'Quantité', 'Prix unitaire', 'Total'],
              ...order.products.map(product => [product.name, product.quantity, `${product.price} €`, `${product.quantity * product.price} €`]),
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 18,
          bold: true,
          margin: [0, 10, 0, 5]
        }
      },
      defaultStyle: {
        font: 'Roboto'
      }
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download(`facture_${order.id}.pdf`);
  }

  }

