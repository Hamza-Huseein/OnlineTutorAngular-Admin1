import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main-service.service';
import { RegistrationDTO } from 'src/app/dto/Authentication/registrationdto';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  input:RegistrationDTO= new RegistrationDTO()
  constructor(public router:Router,public backend:MainService,
    public spinner: NgxSpinnerService,public toastr : ToastrService
  ){
    
  }
  CreateNewAccount(){
    if(this.input.fullname == undefined || this.input.fullname == ''){
      this.toastr.warning('Please Enter User name')
      return;
    }
    if(this.input.password == undefined || this.input.password == ''){
      this.toastr.warning('Please Enter Password')
      return;
    }
    if(this.input.email == undefined || this.input.email == ''){
      this.toastr.warning('Please Enter Email')
      return;
    }
    if(this.input.phone == undefined || this.input.phone == ''){
      this.toastr.warning('Please Enter Phone')
      return;
    }
    if(this.input.nationality == undefined || this.input.nationality == ''){
      this.toastr.warning('Please Enter Phone')
      return;
    }
   
    this.spinner.show()
    this.backend.Register(this.input).subscribe(res=>{
      this.spinner.hide()
      this.toastr.success('New Account has been Created')
      this.router.navigate(['/login'])
    },err=>{
      this.spinner.hide()
      this.toastr.error('Failed To Create Account')
    })
  }
}
