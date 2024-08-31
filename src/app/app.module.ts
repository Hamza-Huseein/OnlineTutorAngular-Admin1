import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './base-component/app.component';
import { CertificateComponent } from './pages/certificate/certificate.component';
import { CartComponent } from './pages/cart/cart.component';
import { CartitemComponent } from './pages/cartitem/cartitem.component';
import { CourseComponent } from './pages/course/course.component';
import { ErrorComponent } from './pages/error/error.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { SessionComponent } from './pages/session/session.component';
import { TaskComponent } from './pages/task/task.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { MainComponent } from './pages/main/main.component';
import { ConfirmDialogComponent } from './sharedcomponent/confirm-dialog/confirm-dialog.component';
import { NavComponent } from './sharedcomponent/nav/nav.component';
import { FooterComponent } from './sharedcomponent/footer/footer.component';
import { AlertComponent } from './sharedcomponent/alert/alert.component';
import { UserComponent } from './pages/user/user.component';
import {HttpClientModule} from '@angular/common/http';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxSpinnerModule } from "ngx-spinner";
import { RegistrationComponent } from './pages/registration/registration.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    CertificateComponent,
    CartComponent,
    CartitemComponent,
    CourseComponent,
    InvoiceComponent,
    LoginComponent,
    LogoutComponent,
    ResetpasswordComponent,
    SessionComponent,
    TaskComponent,
    WishlistComponent,
    MainComponent,
    ConfirmDialogComponent,
    NavComponent,
    FooterComponent,
    AlertComponent,
    UserComponent,
    RegistrationComponent,
    ErrorComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    NgxSpinnerModule,
    FormsModule,
    ToastrModule.forRoot(),
    MatDialogModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
