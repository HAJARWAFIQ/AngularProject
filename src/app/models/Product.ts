// product.model.ts

import { Promotion } from "./promotion";


export class Product {
    id: string;
    name: string;
    quantity: number;
    price: number;
    description: string;
    imageUrl : string;
    size?: string;     // Taille du produit
    color?: string;    // Couleur du produit
   category: string;
   showDetails?: boolean; // Catégorie du produit
   promotion?: Promotion | null;
  
 

  
    constructor(id: string, name: string, quantity: number, price: number, description: string,
      imageUrl: string,size:string,color:string,category:string,  promotion?: Promotion) {
      this.id = id;
      this.name = name;
      this.quantity = quantity;
      this.price = price;
      this.description = description;
      this.imageUrl=imageUrl ;
      this.size=size;
      this.color=color;
      this.category=category
      this.promotion = promotion || null;
    }
  }
  