import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Denues } from '../models/denues';
import { Estados } from '../models/estados';
import { Municipios } from '../models/municipios';
import { Unidades } from '../models/unidades';
import { Localidades } from '../models/localidades';
import { Poblacion } from '../models/poblaciones';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

 

  apiURL = 'http://104.198.244.0:8082/api/auth/';

  
  
  constructor(
    private http: HttpClient,
  ) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'

    })
  }  

  
  getEstados(): Observable<Estados> {
    return this.http.get<Estados>(this.apiURL + 'estados', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }   



  getMunicipios(idestado): Observable<Municipios> {
    return this.http.get<Municipios>(this.apiURL + 'municipios?idestado=' + idestado, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }   


  getUnidades(): Observable<Unidades> {
    return this.http.get<Unidades>(this.apiURL + 'categorias', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }   


  getDenues(idestado, idmunicipio, tipo): Observable<Denues> {
    return this.http.get<Denues>(this.apiURL + 'empresas?idestado=' + idestado +
    '&idmunicipio=' + idmunicipio + '&tipo=' + tipo, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }   

  getlocalidades(idmunicipio, idestado): Observable<Localidades> {
    return this.http.get<Localidades>(this.apiURL + 'localidad?idmunicipio=' + idmunicipio + '&idestado=' + idestado, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getPoblacion(idlocalidad, idestado, idmunicipio): Observable<Poblacion> {
    return this.http.get<Poblacion>(this.apiURL + 'poblacion?idlocalidad=' + idlocalidad + '&idestado='+idestado+'&idmunicipio='+idmunicipio, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

   // Error handling 
   handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
