import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { CartComponent } from './pages/cart/cart.component';
import { CartitemComponent } from './pages/cartitem/cartitem.component';
import { CertificateComponent } from './pages/certificate/certificate.component';
import { CourseComponent } from './pages/course/course.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { SessionComponent } from './pages/session/session.component';
import { TaskComponent } from './pages/task/task.component';
import { UserComponent } from './pages/user/user.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { ErrorComponent } from './pages/error/error.component';
import { RegistrationComponent } from './pages/registration/registration.component';

const routes: Routes = [
  {
    path:'',
    component:MainComponent
  },
  {
    path:'registration',
    component:RegistrationComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'logout',
    component:LogoutComponent
  },
  {
    path:'cart',
    component:CartComponent
  },
  {
    path:'cartitem',
    component:CartitemComponent
  },
  {
    path:'certificate',
    component:CertificateComponent
  },
  {
    path:'course',
    component:CourseComponent
  },
  {
    path:'invoice',
    component:InvoiceComponent
  },
  {
    path:'session',
    component:SessionComponent
  },
  {
    path:'task',
    component:TaskComponent
  },
  {
    path:'user',
    component:UserComponent
  },
  {
    path:'wishlist',
    component:WishlistComponent
  },
  {
    path:'resetpassword',
    component:ResetpasswordComponent
  },
  {
    path:'error',
    component:ErrorComponent
  },
  {
    path:'**',
    component:ErrorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
