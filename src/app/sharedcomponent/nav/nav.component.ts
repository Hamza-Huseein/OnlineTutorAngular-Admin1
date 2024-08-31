import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(public router:Router,public backend:MainService,
    public spinner: NgxSpinnerService,public toastr : ToastrService
  ){}
  LogoutFuncationaity() {
    this.backend.Logout();
  }
}
