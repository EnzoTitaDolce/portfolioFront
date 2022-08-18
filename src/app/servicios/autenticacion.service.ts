import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';//importo el HttpClient para hacer la llamada a la api
import { BehaviorSubject, Observable } from 'rxjs';//behaviorsubject tiene noción de estado, se puede acceder al último valor disponible y tmb permite
//utilizar los metodos next etc
import { map } from 'rxjs';//map es un operador que no tengo muy en claro que mierda es lo que hacer. INVESTIGAAAAAAAAARRRRRRRR!!!!!!
@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  url="http://npinti.ddns.net:9008/api/auth/login";//variable donde guardo la url de la api
  usuarioActual:BehaviorSubject<any>;//creo un objeto llamada usuarioActual donde especifíco el behavior subject
  constructor(private http:HttpClient)//como HttpClient es un servicio lo inyectamos en el contructor
   { 
    
    console.log("El servicio de autenticación está corriendo");//para ver si el servicio está funcionando
    this.usuarioActual=new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('usuario')||'{}'))/*inicializo el objeto usuarioActual con
    lo que está almacenado en el sesion storage, eso se almacena en el momento del login*/

  }
  iniciarSesion(credenciales:any):Observable<any>{
    //recibe las credenciales y lo decoro como observable para que los controladores se puedan suscribir
    //en este método se hace la llamda a la api
    
    //retorno esto al controlador
    //para retornar el método post primero requiere la url y después los datos
    //el método pipe encadena operardores, es decir, realiza acciones previo a retornar la repsuesta a los controladores
    //el map podría modificar los datos q recibe y recién pasarlos
    return this.http.post(this.url, credenciales).pipe(map(data=>{
      /*en primer lugar necesito llevar lo que me devuelve la api (o sea el token) al sessionStorage porque después lo voy a necesitar
      para acceder a los datos y recursos del servidor*/
      /*el sesion storage recibe dos parámetros: la clave(sería la variable donde guarda la información que recibe )
      y el otro parámetro sería la información */
      sessionStorage.setItem('usuario',JSON.stringify(data));
      
      return data;
    }))
      //ahora solo queda inyectar el servicio de autenticación en el componente del login. Esto lo hago en el controlador del log in
  }
}
