import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';



/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

*/
let apiUrl = 'http://localhost/prueba/Reto-programacion-CNT';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');


  }


  getData(): Observable<any> {

    let pacientes = this.http.get(apiUrl + '/obtener_pacientes.php');
    let consulta = this.http.get(apiUrl + '/obtener_consulta.php');
  



    return forkJoin([pacientes,consulta]);
  }


  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      //'Access-Control-Allow-Origin': '*',

    })
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        'Backend returned code ${error.status}, ' +
        'body was: ${error.error}');
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };



 
  register(data): Observable<any> {
    return this.http.post(apiUrl + '/registrar_paciente.php', data, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  assign(data): Observable<any> {
    return this.http.post(apiUrl + '/atender_paciente.php', data, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  liberar(): Observable<any> {
    return this.http.post(apiUrl + '/liberar_consulta.php', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }









}






