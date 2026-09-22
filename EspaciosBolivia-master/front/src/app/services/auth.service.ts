import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable(); // Suscribirse al usuario actual

  private readonly apiUrl = 'http://localhost:3000/usuario'; // Tu API base

  constructor(private readonly http: HttpClient) {}

  // Método para iniciar sesión
  login(usuario: { nombre: string, contrasena: string, tipousuario: string }): Observable<any> {
    return this.http.post('http://localhost:3000/usuario/login',usuario);
  }
  
  // Método para registrar un nuevo usuario
  registrarusuario(usuario: { nombre: string; contrasena: string; email: string; numcontacto: number; tipousuario: string }): Observable<any> 
  {
    return this.http.post('http://localhost:3000/usuario',usuario);
  }
  //Metodo para registrar un nuevo evento
  registrarevento(evento: { nombre: string; tipo_evento: string; descripcion: string; id_usuario: string; id_espacio:string; fecha_evento: string; capacidad_personas: number; hora_inicio:number; hora_fin:number; tipo_pago:string; img_evento:string }):Observable<any>
  {
    return this.http.post('http://localhost:3000/evento',evento);
  }
  
  //Metodo para registrar un nuevo espacio
  registrarespacio(espacio: { nombre: string; ubicacion:string; costo: number }):Observable<any>
  {
    return this.http.post('http://localhost:3000/espacio',espacio);
  }

  actualizaevento(evento: { nombre:string; descripcion:string; capacidad_personas:number; url_permisos:string; img_evento:string }):Observable<any>
  {
    return this.http.put('http://localhost:300/actualizar-evento',evento);
  }

  eliminarEvento(id_evento: string) {
    return this.http.delete('http://localhost:3000/eliminar-evento', {
      body: { id_evento }
    });
  }


  // Método para enviar el comentario y la puntuación
  enviarComentario(comentarios: {eventoId: string, calificacion: number, comentario: string}): Observable<any> {
    console.log('Enviando al servidor:', comentarios);
    return this.http.post('http://localhost:3000/calificacion', comentarios);
  }
  
  cambiarDueno(evento:{usuarioNombre: string; eventoNombre: string}){
    return this.http.patch('http://localhost:3000/evento/change-user',evento);
  }

  cambiarEspacio(evento: {eventoNombre:string; espacioNombre:string}){
    return this.http.patch('http://localhost:3000/evento/reubicar',evento);
  }
  
  cambiarEstadoEvento(evento: {eventoNombre:string; estatus:string}){
    return this.http.patch('http://localhost:3000/evento/actualizar-estado',evento)
  }

  cambiarEstadoUsuario(usuario: {nombreUser:string; estado:string}){
    return this.http.patch('http://localhost:3000/usuario/cambiar-estatus',usuario);
  }

  cambiarTipoUsuario(usuario: {nombreUser:string; tipo:string}){
    return this.http.patch('http://localhost:3000/usuario/cambiar-tipo',usuario);
  }

  procesarPeticion(peticion: {nombreEvento: string, estatus: string}){
    return this.http.patch('http://localhost:3000/peticion/cambiar-estado',peticion);
  }
}

