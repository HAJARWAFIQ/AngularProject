// product.model.ts
export class Product {
    id: number;
    name: string;
    quantity: number;
    price: number;
    description: string;
    imageUrl : string;
  
    constructor(id: number, name: string, quantity: number, price: number, description: string,imageUrl: string) {
      this.id = id;
      this.name = name;
      this.quantity = quantity;
      this.price = price;
      this.description = description;
      this.imageUrl=imageUrl ;
    }
  }
  