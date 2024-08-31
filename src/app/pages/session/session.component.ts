import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main-service.service';
import { CreateSessionDTO } from 'src/app/dto/Session/CreateSessionDTO';
import { sessiondto } from 'src/app/dto/Session/sessiondto';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent {
  displayedColumns: string[] = ['sessionid','startdate','starttime', 'endtime', 'capacity', 'numberoflecture','topics','coursename','isactive'];
  dataSource: MatTableDataSource<sessiondto>;
  sessionarrdto:sessiondto[]=[]
  selectedSession: sessiondto = new sessiondto();
  Input: CreateSessionDTO =new CreateSessionDTO();


  @ViewChild(MatPaginator) paginator: MatPaginator =new MatPaginator(new MatPaginatorIntl(),ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort;

  constructor (public backend :MainService ,public spinner :NgxSpinnerService,public tostr: ToastrService){
    this.dataSource = new MatTableDataSource
    this.sort= new MatSort
  }

  ngOnInit(){
    this.spinner.show
    this.backend.getSession().subscribe(
      res=>{
        this.spinner.hide()
        this.sessionarrdto = res
        this.dataSource.data=this.sessionarrdto
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
  selectSession(row: sessiondto) { 
    this.selectedSession = { ...row };
  }

  saveChanges() { 
    const dto: sessiondto = {
      
      sessionId:this.selectedSession.sessionId,
      startDate: this.selectedSession.startDate,
      startTime: this.selectedSession.startTime,
      endTime: this.selectedSession.endTime,
      capacity: this.selectedSession.capacity,
      topics: this.selectedSession.topics,
      numberOfLecture: this.selectedSession.numberOfLecture,
      courseName: this.selectedSession.courseName,
      isActive: this.selectedSession.isActive,
    };
  
    this.backend.EditSesssion(dto, this.selectedSession.sessionId).subscribe(
      res => {
        alert("Session updated successfully!");
      },
      (err: HttpErrorResponse) => {
        console.error("Error updating session", err);
        alert("Failed to update the session.");
      }
    );
  }
  saveChangesCreate() { 
      this.spinner.show();
      this.backend.CreateSession(this.Input).subscribe(
        (res) => {
          this.spinner.hide();
          this.tostr.success('Created Successfully');
          
        },
        (err) => {
          this.spinner.hide();
          this.tostr.error('Failed To Creat Session');
        }
      );
    }
}
