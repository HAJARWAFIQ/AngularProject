export interface Order {
    id: string;
    userId: string;
    products: {
      productId: string;
      name: string;
      price: number;
      quantity: number;
    }[];
    totalAmount: number;
    status: 'Pending' | 'Accepted' | 'Rejected';
    createdAt: Date;
    updatedAt: Date;
  }
  