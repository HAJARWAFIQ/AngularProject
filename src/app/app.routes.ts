import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog-component/catalog-component.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './register/register.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CategorieComponent } from './categorie/categorie.component';
import { AddpromotionComponent } from './addpromotion/addpromotion.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { AdminOrderListComponent } from './admin-order-list/admin-order-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path:'catalog' , component: CatalogComponent},
    { path:'home', component: HomeComponent},
    {path: 'cart', component: CartComponent},
    {path:'login', component: SignInComponent},
    {path: 'register',component:RegisterComponent},
    {path: 'add-product', component:AddProductComponent},
    {path: 'edit-product/:id',component:EditProductComponent},
    {path:'categorie/:category',component:CategorieComponent},
    {path:'add-promotion/:id',component:AddpromotionComponent},
    {path:'order-confirmation/:id',component:OrderConfirmationComponent},
    { path: 'order-status/:id', component: OrderStatusComponent },
    { path: 'admin-orders', component: AdminOrderListComponent }

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }