import { Injectable } from '@angular/core';
import { Product } from './models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [
    new Product(1, 'EFRRR', 5, 1400, 'L’écran de l’iPhone 14 a des angles arrondis qui suivent la ligne élégante de l’appareil et s’inscrivent dans un rectangle standard. Si l’on mesure ce rectangle, l’écran affiche une diagonale de 6,06 pouces (la zone d’affichage réelle est moindre).Écran HDR True Tone Large gamme de couleurs (P3) Haptic Touch Contraste 2 000 000:1 (standard) Luminosité maximale de 800 nits (standard)  luminosité de pointe de 1 200 nits (HDR) Revêtement oléophobe résistant aux traces de doigts Affichage simultané de plusieurs langues et jeux de caractère','assets/iphone14.jpeg'),
    new Product(2, 'AER22', 6, 500, 'Tablette SAM 12 pouces Grand écran de 12 pouces avec une résolution WQXGA (2560 x 1600) pour des images nettes et précises.Technologie d affichage Super AMOLED pour des couleurs vives et des contrastes profonds. Dalle Gorilla Glass 5 pour une résistance accrue aux rayures et aux chocs.','assets/Tablette.jpg'),
    new Product(3, 'RTVV', 7, 1400, 'L’écran de l’iPhone 14 a des angles arrondis qui suivent la ligne élégante de l’appareil et s’inscrivent dans un rectangle standard. Si l’on mesure ce rectangle, l’écran affiche une diagonale de 6,06 pouces (la zone d’affichage réelle est moindre).Écran HDR True Tone Large gamme de couleurs (P3) Haptic Touch Contraste 2 000 000:1 (standard) Luminosité maximale de 800 nits (standard)  luminosité de pointe de 1 200 nits (HDR) Revêtement oléophobe résistant aux traces de doigts Affichage simultané de plusieurs langues et jeux de caractère','assets/iphone14.jpeg'),
    new Product(4,'SQZEE',5,1500, ' 48-inch screen size, ideal for small spaces or as a second screen.4K Ultra HD (3840 x 2160) resolution for sharp and clear images LED display technology for low power consumption HDR (High Dynamic Range) for better color and contrast reproduction','assets/SmartTv.jpg')
  ];

  constructor() {}
  
getProducts(): Product[] {
    return this.products;
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

}
