import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenidopersona',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bienvenidopersona.component.html',
  styleUrls: ['./bienvenidopersona.component.css'],
})
export class BienvenidopersonaComponent implements OnInit {
  usuario: any = {
    nombre: null,
    contrasena: null,
    tipousuario: null,
  };
  evento: any = {
    nombre_evento: null
  };
  eventos: any[] = [];
  error: boolean = false;
  isDropdownOpen= false; // Estado para el dropdown
  nombre_evento: string = '';
  tipo: string = 'persona';

  // Variables para el modal de comentario
  modalAbierto: boolean = false;
  eventoSeleccionado: any = null;
  calificacion: number = 0;
  comentario: string = '';

  constructor(
    private readonly apiService: ApiService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.loadEventos();
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
    this.router.navigate(['/bienvenidopersona', this.usuario.nombre]);  
  }

  goToCalendario() {
    this.router.navigate(['/calendarioUser']);  
  }



  // Método para cargar los eventos desde el servicio
  async loadEventos() {
    try {
      this.eventos = await this.apiService.getEventosusuarionormal();
      if (this.eventos.length === 0) {
        console.warn('No hay eventos disponibles.');
      } else {
        console.log('Eventos cargados:', this.eventos);
      }
      this.error = false;
    } catch (error) {
      console.error('Error al cargar eventos:', error);
      this.error = true;
      this.eventos = [];
    }
  }

  // Método para redirigir a la página de registro de evento
  goToRegistrar() {
    this.router.navigate(['/registroevento1', this.usuario.nombre]);
  }

  // Método para cerrar el modal
  cerrarModal() {
    this.modalAbierto = false;
    this.calificacion = 0;
    this.comentario = '';
  }

  abrirModal(evento: any): void {
  this.modalAbierto = true;
  this.eventoSeleccionado = evento.nombre; // Asigna el nombre del evento seleccionado
  this.nombre_evento = this.eventoSeleccionado; // Actualiza la propiedad 'nombre_evento'
}

  
  enviarComentario(): void {
    const comentarios = {
      eventoId: this.nombre_evento, // Cambia 'nombre_evento' por 'eventoId'
      calificacion: this.calificacion,
      comentario: this.comentario
    };

    this.authservice.enviarComentario(comentarios).subscribe(
      (respuesta) => {
        console.log('Comentario enviado exitosamente:', respuesta);
        this.cerrarModal();
      },
      (error) => {
        console.error('Error al enviar el comentario:', error);
        alert('Hubo un error al enviar el comentario. Intenta de nuevo.');
      }
    );
  }

} 
