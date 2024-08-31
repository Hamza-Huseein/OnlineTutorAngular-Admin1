import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main-service.service';
import { CreateInvoiceDTO } from 'src/app/dto/invoce/CreateInvoiceDTO';
import { invoicedto } from 'src/app/dto/invoce/invoicedto';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {
  displayedColumns: string[] = ['invoiceid','date', 'note', 'totalprice','cart','isactive'];
  dataSource: MatTableDataSource<invoicedto>;
  invoicearrdto:invoicedto[]=[]
  selectedInvoice: invoicedto = new invoicedto();
  Input: CreateInvoiceDTO =new CreateInvoiceDTO();

  @ViewChild(MatPaginator) paginator: MatPaginator =new MatPaginator(new MatPaginatorIntl(),ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort;

  constructor (public backend :MainService ,public spinner :NgxSpinnerService,public tostr: ToastrService){
    this.dataSource = new MatTableDataSource
    this.sort= new MatSort
  }

  ngOnInit(){
    this.spinner.show
    this.backend.getInvoice().subscribe(
      res=>{
        this.spinner.hide()
        this.invoicearrdto= res
        this.dataSource.data=this.invoicearrdto
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
  selectInvoice(row: invoicedto) { 
    this.selectedInvoice = { ...row };
  }

  saveChanges() { 
    const dto: invoicedto = {
      invoiceId:this.selectedInvoice.invoiceId,
      isActive:this.selectedInvoice.isActive,
      cartId:this.selectedInvoice.cartId,
      date:this.selectedInvoice.date,
      note:this.selectedInvoice.note,
      totalPrice:this.selectedInvoice.totalPrice,


    };
  
    this.backend.EditInvoice(dto, this.selectedInvoice.invoiceId).subscribe(
      res => {
        alert("Invoice updated successfully!");
      },
      (err: HttpErrorResponse) => {
        console.error("Error updating Invoice", err);
        alert("Failed to update the Invoice.");
      }
    );
  }
  saveChangesCreate() { 
    this.spinner.show();
    this.backend.CreateInvoice(this.Input).subscribe(
      (res) => {
        this.spinner.hide();
        this.tostr.success('Created Successfully');
        
      },
      (err) => {
        this.spinner.hide();
        this.tostr.error('Failed To Creat Invoice');
      }
    );
  }
}
