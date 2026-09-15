import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-bienvenidoadmin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bienvenidoadmin.component.html',
  styleUrls: ['./bienvenidoadmin.component.css'] 
})
export class BienvenidoadminComponent implements OnInit {
  usuario: any = {
    nombre: null,
    estatus: null,
    tipo: null
  };
  evento: any = {
    eventoNombre: null,
    espacioNombre: null,
    estatus: null
  };

  nombre: string = '';
  calificaciones: any[] = [];
  espacioNombre: string = '';
  eventoNombre: string = '';
  eventos: any[] = [];

  tipo: string = 'admin';

  usuarios: any[] = [];  // Array para almacenar los usuarios pendientes
  usuarioSeleccionado: any = null;  // Propiedad para almacenar el usuario seleccionado
  isDropdownOpen= false; // Estado para el dropdown

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private readonly authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.loadEventos();
    this.loadUsuarios();
    this.usuario.nombre = this.route.snapshot.paramMap.get('User');
    console.log('nombre del user:', this.usuario.nombre);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    console.log('Dropdown toggled', this.isDropdownOpen); 
  }

  logout() {
    console.log('Cerrando sesión...');
    // Aquí puedes llamar a tu servicio de autenticación
    this.router.navigate(['/iniciopagina']); // Redirigir a login
  }

  goToMapa() {
    this.router.navigate(['/mapa', this.usuario.nombre, this.tipo]);  
  }

  goToBienvenido() {
    this.router.navigate(['/bienvenidoadmin', this.usuario.nombre]);  
  }

  goToCalendario() {
    this.router.navigate(['/calendarioUser']);  
  }




  async loadEventos() {
    try {
      this.eventos = await this.apiService.getEventospendientes();
      console.log('Eventos cargados:', this.eventos);
    } catch (error) {
      console.error('Error al cargar eventos:', error);
      this.eventos = [];
    }
  }

  async loadUsuarios() {
    try {
      const usuariosPendientes: any[] = await this.apiService.getUsuariosPendientes();
      console.log('Usuarios pendientes:', usuariosPendientes);

      if (usuariosPendientes && usuariosPendientes.length > 0) {
        this.usuarios = usuariosPendientes;
      } else {
        console.warn('No se encontraron usuarios pendientes.');
        this.usuarios = [];
      }
    } catch (error) {
      console.error('Error al obtener los usuarios pendientes:', error);
      this.usuarios = [];
    }
  }
  
  
  cerrarModal() {
    this.modalAbierto = false;
    this.eventoSeleccionado = null;
    this.usuarioSeleccionado = null;
  }

  modalAbierto: boolean = false; // Valor inicial
  eventoSeleccionado: any;
  

  abrirModal(evento: any) {
    console.log("Abriendo el modal para el evento:", evento.nombre);
    this.modalAbierto = true;
    this.eventoSeleccionado = evento;
  
    // Check if 'evento.usuario' exists before setting usuarioSeleccionado
    if (evento.usuario && evento.usuario.nombre) {
      this.usuarioSeleccionado = evento.usuario;
      console.log("Abriendo el modal para el usuario:", this.usuarioSeleccionado.nombre);
    } else {
      console.error('No se ha encontrado un usuario válido para este evento.');
    }
  }
 
  
  cambiarEstado() {
    if (this.eventoSeleccionado) {
      // Normalizamos estado, convirtiendo todo a minúsculas para asegurar la consistencia
      const nuevoEstado = this.eventoSeleccionado.estado.toLowerCase() === 'confirmado' ? 'rechazado' : 'confirmado';
  
      console.log(`Cambiando el estado del evento ${this.eventoSeleccionado.nombre} a ${nuevoEstado}`);
      this.authservice.cambiarEstadoEvento({
        eventoNombre: this.eventoSeleccionado.nombre,  
        estatus: nuevoEstado  
      }).subscribe(
        (response) => {
          console.log('Estado del evento cambiado exitosamente', response);
  
          // Actualizamos la lista de eventos para reflejar el cambio
          this.loadEventos(); // Este método recarga los eventos desde el backend
  
          // Actualizamos el estado del evento directamente en la lista local
          this.eventoSeleccionado.estado = nuevoEstado; // Cambia el estado del evento en la lista local
          this.cerrarModal();
          alert(`Estado del evento cambiado a ${nuevoEstado} correctamente.`);
        },
        (error) => {
          console.error('Error al cambiar el estado del evento', error);
          alert('Hubo un problema al cambiar el estado del evento. Intenta más tarde.');
        }
      );
    } else {
      console.error('No hay evento seleccionado para cambiar el estado.');
      alert('Por favor, selecciona un evento para cambiar su estado.');
    }
  }
  

  cambiarDueno() {
    console.log("Intentando cambiar el dueño");
    if (this.eventoSeleccionado.usuarioNombre && this.eventoSeleccionado.eventoNombre) {
      const evento = {
        usuarioNombre: this.eventoSeleccionado.usuarioNombre,
        eventoNombre: this.eventoSeleccionado.eventoNombre
      };

      this.authservice.cambiarDueno(evento).subscribe(
        (response) => {
          console.log('Dueño cambiado exitosamente', response);
          this.cerrarModal();
          this.loadEventos();
        },
        (error) => {
          // Manejo de errores mejorado
          if (error.status === 404) {
            console.error('Usuario o evento no encontrado', error);
            alert('Usuario o evento no encontrado. Verifique los datos.');
          } else if (error.status === 403) {
            console.error('Usuario no autorizado para este cambio', error);
            alert('El usuario no está autorizado para realizar este cambio.');
          } else {
            console.error('Error al cambiar dueño', error);
            alert('Hubo un problema al cambiar el dueño. Intenta más tarde.');
          }
        }
      );
    } else {
      alert('Por favor, ingrese el nombre del nuevo dueño y el nombre del evento.');
    }
  }

  cambiarEspacio() {
    console.log("Intentando cambiar el espacio");
    if (this.eventoSeleccionado.eventoNombre && this.eventoSeleccionado.espacioNombre) {
      const evento = {
        eventoNombre: this.eventoSeleccionado.eventoNombre,
        espacioNombre: this.eventoSeleccionado.espacioNombre
      };

      this.authservice.cambiarEspacio(evento).subscribe(
        (response) => {
          console.log('Espacio cambiado exitosamente', response);
          this.cerrarModal();
          this.loadEventos();
        },
        (error) => {
          // Manejo de errores mejorado
          if (error.status === 404) {
            console.error('Evento o espacio no encontrado', error);
            alert('Evento o espacio no encontrado. Verifique los datos.');
          } else {
            console.error('Error al cambiar espacio', error);
            alert('Hubo un problema al cambiar el espacio. Intenta más tarde.');
          }
        }
      );
    } else {
      alert('Por favor, ingrese el nombre del evento y el nuevo espacio.');
    }
  }


  cambiarEstadoUsuario() {
    if (this.usuarioSeleccionado) {
      // Aquí puedes implementar la lógica de confirmar o rechazar al usuario
      console.log(`Usuario seleccionado: ${this.usuarioSeleccionado.nombre}`);
      // Ejemplo de lógica: actualizando el estado
      this.usuarioSeleccionado.estado = this.usuarioSeleccionado.estado === 'pendiente' ? 'confirmado' : 'rechazado';
      console.log(`Nuevo estado del usuario: ${this.usuarioSeleccionado.estado}`);
      // Aquí puedes llamar a un servicio para actualizar el estado en la base de datos si es necesario
    } else {
      console.warn('No se ha seleccionado un usuario.');
    }
  }
  
  
  procesarPeticion(peticion: any, estatus: string) {
    console.log("por esto no da peticiones");
    if (peticion && estatus) {
      peticion.estado = estatus; // Cambia el estado localmente
      this.authservice.procesarPeticion({ nombreEvento: peticion.nombre, estatus }).subscribe(
        (response) => {
          console.log('Petición procesada exitosamente:', response);
          this.loadEventos(); // Actualiza la lista de eventos tras el cambio
        },
        (error) => {
          console.error('Error al procesar la petición:', error);
        }
      );
    } else {
      console.error('Datos inválidos para procesar la petición.');
    }
  }  
  
}
