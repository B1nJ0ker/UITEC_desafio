import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Alert, AlertService } from '../../_alert';
import { Categoria } from '../../interfaces/categoria/categoria';
import { GeneralConfig } from '../../common/general.config';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiURL = GeneralConfig.apiURL+"api/categoria/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient, private alertService: AlertService) { }

  exibirAlerta(e: any) {
    let problemString = "<li>";
    for (const key in e.errors) {
      if (Object.prototype.hasOwnProperty.call(e.errors, key)) {              
          problemString += "<ul>"+e.errors[key]+"</ul>";          
      }
    }
    problemString += "</li>";    
    this.alertService.error(e.message+problemString);
  }

  getAll(): Observable<Categoria[]> {
   return this.httpClient.get<Categoria[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }
  create(categoria: Categoria): Observable<Alert> {
    return this.httpClient.post<Alert>(this.apiURL, JSON.stringify(categoria), this.httpOptions)
    .pipe(
      catchError((e: HttpErrorResponse) => {
        return this.errorHandler(e);
    }))
  }

  delete(id: number){
    return this.httpClient.delete<Alert>(this.apiURL + id, this.httpOptions)
    .pipe(
      catchError((e: HttpErrorResponse) => {
        return this.errorHandler(e);
    }))
  }

  errorHandler(e: any) {
    if(e.error.errors){
      this.exibirAlerta(e.error);
    }
    return throwError(() => new Error(e.error))
  }
}


