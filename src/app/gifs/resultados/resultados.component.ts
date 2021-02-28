import { Component, OnInit, Output } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  constructor(
    private gifsService:GifsService
  ) { }
  
  ngOnInit(): void {
  }
  
  //*Obtenemos el array de resultados que esta en el servicio
  get resultados(){
    return this.gifsService.resultados;
  }
}
