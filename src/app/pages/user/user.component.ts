import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main-service.service';
import { userdot } from 'src/app/dto/User/userdto';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  Input: userdot =new userdot();

  constructor (public backend :MainService ,public spinner :NgxSpinnerService,public tostr: ToastrService){
  
  }

  


  saveChanges() { 
    const dto: userdot = {
      userId: this.Input.userId,
      fullName: this.Input.fullName,
      email: this.Input.email,
      phone: this.Input.phone,
      birthDate: this.Input.birthDate,
      profileImage: this.Input.profileImage,
      nationality: this.Input.nationality
    };
  
    this.backend.EditUser(dto, this.Input.userId).subscribe(
      res => {
        alert("User updated successfully!");
      },
      (err: HttpErrorResponse) => {
        console.error("Error updating User", err);
        alert("Failed to update the User.");
      }
    );
  }
  
}
