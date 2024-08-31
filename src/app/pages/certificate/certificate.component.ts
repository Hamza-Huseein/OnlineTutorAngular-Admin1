import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main-service.service';
import { certificatedto } from 'src/app/dto/certificate/certificatedto';
import { CreateCertificateDTO } from 'src/app/dto/certificate/CreateCertificateDTO';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent {
  displayedColumns: string[] = ['certificateid','fullname', 'coursename', 'studentevaluation','userid','isactive'];
  dataSource: MatTableDataSource<certificatedto>;
  
  certificatearrdto:certificatedto[]=[]
  selectedCertificate: certificatedto = new certificatedto();
  Input: CreateCertificateDTO =new CreateCertificateDTO();


  @ViewChild(MatPaginator) paginator: MatPaginator =new MatPaginator(new MatPaginatorIntl(),ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort;

  constructor (public backend :MainService ,public spinner :NgxSpinnerService ,public tostr: ToastrService){
    this.dataSource = new MatTableDataSource
    this.sort= new MatSort
  }

  ngOnInit(){
    this.spinner.show
    this.backend.getCertificate().subscribe(
      res=>{
        this.spinner.hide()
        this.certificatearrdto= res
        this.dataSource.data=this.certificatearrdto
      },err=>{
        this.spinner.hide()
      }
    )
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  selectCertificate(row: certificatedto) { 
    this.selectedCertificate = { ...row };
  }

  saveChanges() { 
    const dto: certificatedto = {
      certificateId:this.selectedCertificate.certificateId,
      fullName:this.selectedCertificate.fullName,
      courseName:this.selectedCertificate.courseName,
      studentEvaluation:this.selectedCertificate.studentEvaluation,
      userId:this.selectedCertificate.userId,
      isActive:this.selectedCertificate.isActive,
    };
  
    this.backend.EditCertificate(dto, this.selectedCertificate.certificateId).subscribe(
      res => {
        alert("Certificate updated successfully!");
      },
      (err: HttpErrorResponse) => {
        console.error("Error updating Certificate", err);
        alert("Failed to update the Certificate.");
      }
    );
  }
  saveChangesCreate() { 
    if (this.Input.courseName == undefined || this.Input.courseName == '') {
      this.tostr.warning('Course Name Is Required');
      return;
    }
    

    

      this.spinner.show();
      this.backend.CreateCertificate(this.Input).subscribe(
        (res) => {
          this.spinner.hide();
          this.tostr.success('Created Successfully');
          
        },
        (err) => {
          this.spinner.hide();
          this.tostr.error('Failed To Creat Certificate');
        }
      );
    }
}
