import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>; //* ! Este operador indica y asegura que el elemento no va ser null

  constructor(

    private gifsService: GifsService

  ) { }

  ngOnInit(): void {
  }
  
  buscar(){
    const valor = this.txtBuscar.nativeElement.value;
    
    //*Para que no envien strings vacios
    if (valor.trim().length === 0) {
      return;
    }
    
    this.gifsService.buscarGifs( valor );
    
    //*Reseteamos el input
    this.txtBuscar.nativeElement.value = '';
  }

}
