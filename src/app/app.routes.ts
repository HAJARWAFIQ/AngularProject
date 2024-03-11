import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog-component/catalog-component.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path:'catalog' , component: CatalogComponent},
    { path:'home', component: HomeComponent}
    
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }