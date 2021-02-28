import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey:string = 'fQD3daT4y7Laeulizwp1t49OXXseGbBc';
  private url:string    = 'http://api.giphy.com/v1/gifs';


  private _historial:string[] = [];
  public resultados:Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor(
    private http:HttpClient
  ) { 
      //*Obtenemos el historial del localStorage
        this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
        this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
      
    }

    buscarGifs(query:string){

      query = query.trim().toLocaleLowerCase();

      //* Condicion para que no existan duplicados
      if( !this._historial.includes(query)){

        this._historial.unshift( query );
      
        //* Impedimos que se almacenen mas de 10 items
        this._historial = this._historial.splice(0,10);
        
        //*Grabamos en localstorage
        localStorage.setItem('historial', JSON.stringify(this._historial));

      }
      
      const params = new HttpParams()
                    .set('api_key', this.apikey)
                    .set('limit', '20')
                    .set('q',query);
                    console.log(params.toString());

      //*Llamado http a la api de giphy
      this.http.get<SearchGifsResponse>(`${this.url}/search`, { params })
      .subscribe( (resp) => {
        console.log(resp.data);

        this.resultados = resp.data;

        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      })
    }
}
