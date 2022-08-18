import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ServicioDatosService } from './servicios/servicio-datos.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  misDatos:any;
  constructor(private datos:ServicioDatosService){

  }
  title = 'trabajoFinal';
  ngOnInit():void{
    this.datos.obtenerDatos().subscribe(data=>{
      this.misDatos=data;
    })
  }
}
