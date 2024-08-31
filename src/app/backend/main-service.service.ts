import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { coursedto } from '../dto/Course/coursedto';
import { LoginDTO } from '../dto/Authentication/logindto';
import { RegistrationDTO } from '../dto/Authentication/registrationdto';
import { sessiondto } from '../dto/Session/sessiondto';
import { taskdto } from '../dto/Task/taskdto';
import { invoicedto } from '../dto/invoce/invoicedto';
import { certificatedto } from '../dto/certificate/certificatedto';
import { CreateCourseDTO } from '../dto/Course/CreateCourseDTO';
import { CreateCertificateDTO } from '../dto/certificate/CreateCertificateDTO';
import { CreateSessionDTO } from '../dto/Session/CreateSessionDTO';
import { CreateInvoiceDTO } from '../dto/invoce/CreateInvoiceDTO';
import { CreateTaskDTO } from '../dto/Task/CreateTaskDTO';
import { userdot } from '../dto/User/userdto';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private baseURL: string = 'https://localhost:44361';

  constructor(private http:HttpClient,private router:Router){}
  getCourse() : Observable<coursedto[]>
  {
    return this.http.get<coursedto[]>(`${this.baseURL}/api/Shared/GetAllCourseDTOAdmin`)
  }
  getSession() : Observable<sessiondto[]>
  {
    return this.http.get<sessiondto[]>(`${this.baseURL}/api/Shared/GetAllSessionDTOAdmin`)
  }
  
  getTask() : Observable<taskdto[]>
  {
    return this.http.get<taskdto[]>(`${this.baseURL}/api/Shared/GetAllTaskDTOAdmin`)
  }
  getInvoice() : Observable<invoicedto[]>
  {
    return this.http.get<invoicedto[]>(`${this.baseURL}/api/Shared/GetAllInvoiceDTOAdmin`)
  }
  getCertificate() : Observable<certificatedto[]>
  {
    return this.http.get<certificatedto[]>(`${this.baseURL}/api/Shared/GetAllCertificateDTOAdmin`)
  }
  Login(input:LoginDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.post(`${this.baseURL}/api/User/Login`,input, { headers, responseType: 'text' })
  }

  Register(input:RegistrationDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.post(`${this.baseURL}/api/User/CreateNewAccount`,input, { headers, responseType: 'text' })
  }
  Logout(){
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    this.router.navigate([''])
   //return this.http
  }
  getCourseById(id: number): Observable<coursedto> {
    return this.http.get<coursedto>(`${this.baseURL}/api/Shared/GetCourseById/${id}`);
  }
  getSessionById(id: number): Observable<sessiondto> {
    return this.http.get<sessiondto>(`${this.baseURL}/api/Shared/GetSessionById/${id}`);
  }
  EditCourse(input: coursedto, courseId: number | undefined) : Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.put(`${this.baseURL}/api/Shared/UpdateCourseAdmin/${courseId}`,input, { headers, responseType: 'text' })
  }
  EditSesssion(input: sessiondto, SessionId: number | undefined) : Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.put(`${this.baseURL}/api/Shared/UpdateSessionAdmin/${SessionId}`,input, { headers, responseType: 'text' })
  }
  EditCertificate(input: certificatedto, CertificateId: number | undefined) : Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.put(`${this.baseURL}/api/Shared/UpdateCertificateAdmin/${CertificateId}`,input, { headers, responseType: 'text' })
  }
  EditInvoice(input: invoicedto, InvoiceId: number | undefined) : Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.put(`${this.baseURL}/api/Shared/UpdateInvoiceAdmin/${InvoiceId}`,input, { headers, responseType: 'text' })
  }
  EditTask(input: taskdto, tasksId: number | undefined) : Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.put(`${this.baseURL}/api/Shared/UpdateTaskAdmin/${tasksId}`,input, { headers, responseType: 'text' })
  }
  
  EditUser(input: userdot, userId: number | undefined) : Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.put(`${this.baseURL}/api/Shared/UpdateUser/${userId}`,input, { headers, responseType: 'text' })
  }
  DeleteCourse(courseId:number): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.put(`${this.baseURL}/api/Shared/UpdateCourseActivation?Id=${courseId}&value=false`,null, { headers, responseType: 'text' })
  }
  CreateCourse(Input: CreateCourseDTO, ): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.post(`${this.baseURL}/api/Admin/CreateNewCourse`,Input, { headers, responseType: 'text' })
  }
  CreateCertificate(Input: CreateCertificateDTO, ): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.post(`${this.baseURL}/api/Admin/CreateNewCertificate`,Input, { headers, responseType: 'text' })
  }
  CreateSession(Input: CreateSessionDTO, ): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.post(`${this.baseURL}/api/Admin/CreateNewSession`,Input, { headers, responseType: 'text' })
  }
  CreateInvoice(Input: CreateInvoiceDTO, ): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.post(`${this.baseURL}/api/Admin/CreateNewInvoise`,Input, { headers, responseType: 'text' })
  }
  CreateTask(Input: CreateTaskDTO, ): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.post(`${this.baseURL}/api/Admin/CreateNewTask`,Input, { headers, responseType: 'text' })
  }
}
