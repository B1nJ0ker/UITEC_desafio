import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Produto } from '../../interfaces/produto/produto';
import { Alert, AlertService } from '../../_alert';
import { GeneralConfig } from '../../common/general.config';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiURL = GeneralConfig.apiURL+"/api/produto/";
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


  getAll(): Observable<Produto[]> {
   return this.httpClient.get<Produto[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }
  create(produto: Produto): Observable<Alert> {
    return this.httpClient.post<Alert>(this.apiURL, JSON.stringify(produto), this.httpOptions)
    .pipe(
      catchError((e: HttpErrorResponse) => {
        return this.errorHandler(e);
    }))
  }

  find(id: number): Observable<Produto> {
    return this.httpClient.get<Produto>(this.apiURL + id)
    .pipe(
      catchError((e: HttpErrorResponse) => {
        return this.errorHandler(e);
    }))
  }

  update(id: number, produto: Produto): Observable<Alert> {
    return this.httpClient.put<Alert>(this.apiURL + id, JSON.stringify(produto), this.httpOptions)
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
