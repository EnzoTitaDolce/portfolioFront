/*para usar los formualrios reactivos debo importar el ReactiveFormsModule en el app.module.ts */


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';//importo los servicios
import { Route, Router } from '@angular/router';
import { AutenticacionService } from '../servicios/autenticacion.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup; //creo el formulario que luego enlazo con el template
  constructor(private formBuilder:FormBuilder, private autenticacionService: AutenticacionService, private ruta:Router){/*una vez inyectado el servicio de 
  de autenticación en el constructor voy a crear el método que se llame cuando se presione enviar que es el que se va a usar el servicio
  para comunicarse con la api y obtener el token*/

   this.form=this.formBuilder.group(//dentro de las llaves especifico el grupo de form control
      {
       Email:['',[Validators.required, Validators.email]],
       Password:['',[Validators.required, Validators.minLength(8)]],
       texto:['']
       /*Aquí debería venir la información respectiva al token
       ejemplo:
       deviceInfo:["35434638746354368463"],
       deviceType:["DEVICE_TYPE_ANDROID"],
       notificationToken:["654sd68f4bs6df84bs6df54b6adf8b4ad96"]*/
      }
    )

  }

  ngOnInit(): void {
  }
 
  get Email() {

    return this.form.get('Email');

  }

  get Password(){

    return this.form.get('Password');

  }
    onEnviar(event:Event){

      event.preventDefault;
      //me suscribo al servicio de autenticacion
      //le paso como parámetro las credenciales del usuario que están
      //en el value del form
      this.autenticacionService.iniciarSesion(this.form.value).subscribe(data=>{

        console.log("DATA"+JSON.stringify(data));
        this.ruta.navigate(['/portfolio']);//lo enviamos al portfolio luego de la autenticación

      });

    }
}
