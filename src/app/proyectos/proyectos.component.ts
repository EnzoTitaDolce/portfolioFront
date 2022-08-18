import { Component, OnInit } from '@angular/core';
import { ModalProyectosComponent } from '../modal-proyectos/modal-proyectos.component';
import { RecuperarDatosService } from '../servicios/recuperar-datos.service';
import { ServicioDatosService } from '../servicios/servicio-datos.service';
import { Proyectos } from './proyectos';
import { MatDialog } from '@angular/material/dialog';
import { AgregarService } from '../servicios/agregar.service';
import { EliminarService } from '../servicios/eliminar.service';
import { Route, Router } from '@angular/router';
import { EditarService } from '../servicios/editar.service';
import { isNgTemplate } from '@angular/compiler';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  constructor(private datosBd:RecuperarDatosService, private datos:ServicioDatosService, public dialog:MatDialog,
      private agregar:AgregarService, private eliminar:EliminarService, private router:Router, private editar:EditarService) { }
  misDatosBd:any
  misDatos:any;
  suscripcion!: Subscription;

  ngOnInit(): void {
    this.datos.obtenerDatos().subscribe(data =>{
      this.misDatos=data;
})

    this.datosBd.getProyectos().subscribe(data=>{

      this.misDatosBd=data
      console.log(this.misDatosBd)
    })
  }

  getData(){

    this.datosBd.getProyectos().subscribe(data=>{

      this.misDatosBd=data
      console.log(this.misDatosBd);
      
    })}

  abrirDialogo(){

    const dialogo1=this.dialog.open(ModalProyectosComponent,{

      data:new Proyectos('','','','','')

    });

    dialogo1.afterClosed().subscribe(data=>{

      if (data!=undefined && data!=null && data!='')
      this.agregarProyectos(data);

    });

  }

  
  abrirDialogoEditar(id:number, nombreProyecto:String, fecha:String, tecnologia:String, comentarios:String, url:String){

    const dialogoEditar=this.dialog.open(ModalProyectosComponent,{
              
            data:{'id':id,'nombreProyecto':nombreProyecto,'fecha':fecha,'tecnologia':tecnologia,'comentarios':comentarios,'url':url}
            
      });
      dialogoEditar.afterClosed().subscribe(data=>{
          
        this.editarProyectos(data.id,data);
        console.log(data);
      })

    }
  
  agregarProyectos(valores:any){
    let body = {
      nombreProyecto: valores.nombreProyecto,
      fecha: valores.fecha,
      tecnologia: valores.tecnologia,
      comentarios:valores.comentarios,
      url:valores.url
    }
    this.agregar.agregarProyectos(body).subscribe(response=>{

      console.log(response);

      this.ngOnInit;
     
      /*this.suscripcion = this.agregar.refresh$.subscribe(()=>{

        this.datosBd.getProyectos().subscribe(data=>{
  
          this.misDatosBd=data
          console.log(this.misDatosBd)
        })
  
      })*/
      

    });
    /*let urlActual=this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([urlActual]);
  }); */
      
    }
    eliminarProyectos(id:number){

     
        this.eliminar.eliminarProyectos(id)
          .subscribe(response => {
            console.log(response);
          
      })
      let urlActual=this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([urlActual]);
    }); 

      

    }

    editarProyectos(id:number, data:any){
      this.editar.editarProyectosServicio(id,data).subscribe(response=>{
        console.log(response)
      }
      )

    }

}
function getData() {
  throw new Error('Function not implemented.');
}

