import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith } from 'rxjs';
import { MainService } from 'src/app/backend/main-service.service';
import { LoginDTO } from 'src/app/dto/Authentication/logindto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  input : LoginDTO = new LoginDTO()
  constructor(public router:Router,public backend:MainService,
    public spinner: NgxSpinnerService ,public toastr : ToastrService
  ){
    
  }
  Login(){
    if(this.input.username == undefined){
      this.toastr.warning('Please Enter User name')
      return;
    }
    if(this.input.password == undefined){
      this.toastr.warning('Please Enter Password')
      return;
    }
    if(this.input.username == ''){
      this.toastr.warning('User name Colud not be empty')
      return;
    }
   this.spinner.show()
   this.backend.Login(this.input).subscribe(res=>{
    this.spinner.hide()
    localStorage.setItem('isLoggedin','true')
    localStorage.setItem('token',res)
    //let data: any = jwtDecode(res);
    //localStorage.setItem('userId',data.UserId)
    this.router.navigate(['/course'])
   },err=>{
    this.spinner.hide()
    this.toastr.error('Wrong User name / Password')
   }

   )
}
}


