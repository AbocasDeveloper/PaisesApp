import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

    private apiUrl: string = 'https://restcountries.com/v3.1';
    
    get httpParams(){
        return new HttpParams()
            .set('fields', 'flags,capital,name,population,cca2');
    }

    constructor(
        private http: HttpClient
    ) { }
    
    buscarPais(termino: string): Observable<Country[]>{

        const url = `${this.apiUrl}/name/${termino}`;

        return this.http.get<Country[]>(url, {params: this.httpParams});
            //Podemos cambiar la salida del error de la siguente manera
            /*.pipe(
                catchError(err => off(['Salida de error cambiada']))
            );*/
    }

    buscarPorCapital(termino: string): Observable<Country[]>{

        const url = `${this.apiUrl}/capital/${termino}`;

        return this.http.get<Country[]>(url, {params: this.httpParams});
    }

    buscarPorRegion(termino: string): Observable<Country[]>{
        const url = `${this.apiUrl}/region/${termino}`;

        return this.http.get<Country[]>(url, {params: this.httpParams});
    }

    getPaisPorCodigo( id : string){
        const url = `${this.apiUrl}/alpha?codes=${id}`;

        return this.http.get<Country>(url);
    }

}
