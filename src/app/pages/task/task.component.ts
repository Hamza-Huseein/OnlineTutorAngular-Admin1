import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main-service.service';
import { CreateTaskDTO } from 'src/app/dto/Task/CreateTaskDTO';
import { taskdto } from 'src/app/dto/Task/taskdto';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  displayedColumns: string[] = ['taskid','date', 'starttime','endtime','title', 'mark', 'documentpath','isactive'];
  dataSource: MatTableDataSource<taskdto>;
  taskarrdto:taskdto[]=[]
  selectedTask: taskdto = new taskdto();
  Input: CreateTaskDTO =new CreateTaskDTO();

  @ViewChild(MatPaginator) paginator: MatPaginator =new MatPaginator(new MatPaginatorIntl(),ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort;

  constructor (public backend :MainService ,public spinner :NgxSpinnerService,public tostr: ToastrService){
    this.dataSource = new MatTableDataSource
    this.sort= new MatSort
  }

  ngOnInit(){
    this.spinner.show
    this.backend.getTask().subscribe(
      res=>{
        this.spinner.hide()
        this.taskarrdto= res
        this.dataSource.data=this.taskarrdto
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
  selecttask(row: taskdto) { 
    this.selectedTask = { ...row };
  }

  saveChanges() { 
    const dto: taskdto = {
      tasksId:this.selectedTask.tasksId,
      isActive: this.selectedTask.isActive,
      date: this.selectedTask.date,
      startTime: this.selectedTask.startTime,
      endTime: this.selectedTask.endTime,
      title: this.selectedTask.title,
      mark: this.selectedTask.mark,
      documentPath: this.selectedTask.documentPath
    };
  
    this.backend.EditTask(dto, this.selectedTask.tasksId).subscribe(
      res => {
        alert("Task updated successfully!");
      },
      (err: HttpErrorResponse) => {
        console.error("Error updating Task", err);
        alert("Failed to update the Task.");
      }
    );
  }
  saveChangesCreate() { 
    this.spinner.show();
    this.backend.CreateTask(this.Input).subscribe(
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
