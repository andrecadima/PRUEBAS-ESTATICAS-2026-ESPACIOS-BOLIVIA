import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { Router, ActivatedRoute ,RouterModule } from '@angular/router'; // Importa ActivatedRoute
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ver-evento-presi',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './ver-evento-presi.component.html',
  styleUrl: './ver-evento-presi.component.css'
})
export class VerEventoPresiComponent {
  usuario: any = {
    nombre: null
  }
  evento: any = {
    id: null
  }
  eventoSeleccionado: any = {
    id: null,
    nombre: null,
    tipo_evento: null,
    descripcion: null,
    fecha_reserva: null,
    fecha_evento: null,
    capacidad_personas: null,
    hora_inicio: null,
    hora_fin: null,
    costo: null,
    urlpermisos: null,
    tipo_pago: null,
    img_evento: null,
    estado: null

  };

  isDropdownOpen = false;
  error: any;

  constructor(private authservice: AuthService, private readonly apiService: ApiService,  private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.usuario.nombre= this.route.snapshot.paramMap.get('User'); //para poner el nombre usuario
    this.evento.id= this.route.snapshot.paramMap.get('id');
    console.log('nombre del user:',this.usuario.nombre); //para mmostrar si se obtuvo correctamente 
    console.log('id evento:',this.evento.id);
    this.loadEvento();
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


  async loadEvento (){
    try{
      const eventoS = await this.apiService.getEvento(this.evento.id);
      this.eventoSeleccionado = eventoS;
      console.log('Evento obtenido:',this.eventoSeleccionado);
      console.log('id evento obtenido:',this.eventoSeleccionado.id);
    }catch (error) {
      this.error = 'Hubo un error al cargar el evento';
      console.error('Error al cargar evento:', error);
    }

  }


  goToVolver() {
    this.router.navigate(['/bienvenidopresidente', this.usuario.nombre]);   
  }

  goToMapa() {
    this.router.navigate(['/mapa', this.usuario.nombre]);  
  }

  goToCalendario() {
    this.router.navigate(['/calendarioUser']);  
  }

  
  
  nombre: string = '';
  tipo_evento: string = '';
  descripcion: string = '';
  id_usuario: string = '';
  id_espacio: string = '';
  fecha_evento: string = '';
  capacidad_personas: number = 0;
  url_permisos:string='';
  hora_inicio: number = 0;
  hora_fin: number = 0;
  tipo_pago: string = '';
  img_evento: string = '';
  urlmapa: string = '';
  mensajeError = '';

  

    editarEvento()
    {
       const evento = {
        nombre: this.nombre,
        descripcion: this.descripcion,  
        capacidad_personas: this.capacidad_personas,
        url_permisos: this.url_permisos,
        img_evento: this.img_evento
    };

      this.authservice.actualizaevento(evento).subscribe
      (
        (respuesta) => {
          console.log('Evento editado correctamente:', respuesta);
        },
        (error) => {
          console.error('Error al editar evento:', error);
          this.mensajeError = 'Verifica los datos.';
          alert(this.mensajeError);
        }
      );
    }

    eliminarEvento() {
      const id_evento = this.eventoSeleccionado.id_evento;
      this.authservice.eliminarEvento(id_evento).subscribe(
        (respuesta) => {
          console.log('Evento eliminado correctamente:', respuesta);
        },
        (error) => {
          console.error('Error al eliminar evento:', error);
          this.mensajeError = 'Verifica los datos.';
          alert(this.mensajeError);
        }
      );
    }
    
}
