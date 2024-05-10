import { Routes } from '@angular/router';
import { authGuard } from './security/auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProductsComponent } from './components/body/products/products.component';
import { ProductDetailsComponent } from './components/body/product-details/product-details.component';
import { HomeComponent } from './components/general/home/home.component';
import { ShoppingCartComponent } from './components/modals/shopping-cart/shopping-cart.component';
import { ProductAddEditComponent } from './components/modals/product-add-edit/product-add-edit.component';
import { CategoryAddEditComponent } from './components/modals/category-add-edit/category-add-edit.component';
import { AboutUsComponent } from './components/body/about-us/about-us.component';
import { ContactComponent } from './components/body/contact/contact.component';

export const routes: Routes = [
  { path: '', redirectTo: '/shop/categories/1', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'shop',
    component: HomeComponent,
    canActivateChild: [authGuard],
    children: [
      { path: 'categories/:id', component: ProductsComponent },
      { path: 'products/:id', component: ProductDetailsComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'contact', component: ContactComponent },
    ],
  },
];
