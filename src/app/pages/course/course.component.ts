import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { MainService } from 'src/app/backend/main-service.service';
import { coursedto } from 'src/app/dto/Course/coursedto';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ConfirmDialogData } from 'src/app/dto/confirmdialog/confirmdialog';
import { ConfirmDialogComponent } from 'src/app/sharedcomponent/confirm-dialog/confirm-dialog.component';
import { CreateCourseDTO } from 'src/app/dto/Course/CreateCourseDTO';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  
  displayedColumns: string[] = ['courseid','description','coursename','price','numberofhours','disacountamount','discounttype','priceafterdiscount','isactive'];
  dataSource: MatTableDataSource<coursedto>;

  coursearrdto:coursedto[]=[]
  selectedCourse: coursedto = new coursedto();
  Input: CreateCourseDTO =new CreateCourseDTO();

  @ViewChild(MatPaginator) paginator: MatPaginator =new MatPaginator(new MatPaginatorIntl(),ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort;
  

  

  constructor (public backend :MainService ,public spinner :NgxSpinnerService ,public dialog: MatDialog ,public tostr: ToastrService){
    this.dataSource = new MatTableDataSource
    this.sort= new MatSort
    
  }

  ngOnInit(){
    this.spinner.show
    this.backend.getCourse().subscribe(
      res=>{
        this.spinner.hide()
        this.coursearrdto = res
        this.dataSource.data=this.coursearrdto
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
  selectCourse(row: coursedto) { 
    this.selectedCourse = { ...row };
  }

  saveChanges() { 
    const dto: coursedto = {
      courseId: this.selectedCourse.courseId,
      courseName: this.selectedCourse.courseName,
      description: this.selectedCourse.description,
      price: this.selectedCourse.price,
      disacountAmount: this.selectedCourse.disacountAmount,
      discountType: this.selectedCourse.discountType,
      priceAfterDiscount: this.selectedCourse.priceAfterDiscount,
      numberOfHours: this.selectedCourse.numberOfHours,
      isActive: this.selectedCourse.isActive
    };
  
    this.backend.EditCourse(dto, this.selectedCourse.courseId).subscribe(
      res => {
        alert("Course updated successfully!");
      },
      (err: HttpErrorResponse) => {
        console.error("Error updating course", err);
        alert("Failed to update the course.");
      }
    );
  }
  saveChangesCreate() { 
    if (this.Input.name == undefined || this.Input.name == '') {
      this.tostr.warning('Course Name Is Required');
      return;
    }
    if (this.Input.description == undefined || this.Input.description == '') {
      this.tostr.warning('Description Is Required');
      return;
    }

    

      this.spinner.show();
      this.backend.CreateCourse(this.Input).subscribe(
        (res) => {
          this.spinner.hide();
          this.tostr.success('Created Successfully');
          
        },
        (err) => {
          this.spinner.hide();
          this.tostr.error('Failed To Creat Course');
        }
      );
    }
  }
  
    

  


