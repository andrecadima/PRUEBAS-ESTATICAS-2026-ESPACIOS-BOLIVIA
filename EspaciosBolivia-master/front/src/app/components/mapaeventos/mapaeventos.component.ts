import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { Router, ActivatedRoute ,RouterModule } from '@angular/router'; // Importa ActivatedRoute

@Component({
  selector: 'app-mapaeventos',
  standalone: true,
  templateUrl: './mapaeventos.component.html',
  styleUrls: ['./mapaeventos.component.css'],
  imports: [FormsModule, CommonModule ,RouterModule]  // Asegúrate de incluir CommonModule aquí
})
export class MapaeventosComponent implements OnInit {
  usuario: any = {
    nombre: null
  }
  eventos: any[] = [];
  selectedEvento: string | null = null;  // Aquí la variable solo guardará la URL
  selectedMapUrl: SafeResourceUrl | null = null; // Asegúrate de que esto sea SafeResourceUrl
  error: boolean = false;
  isDropdownOpen = false;

  tipo: any = {
    nomtipo: ''
  }

  tipoNombre: string='';
  // Inyecta ActivatedRoute para acceder a los parámetros de la URL
  constructor( private apiService: ApiService, private readonly sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.usuario.nombre= this.route.snapshot.paramMap.get('User'); //para poner el nombre usuario
    this.tipo.nomtipo= this.route.snapshot.paramMap.get('Tipo');
    this.tipoNombre = this.tipo.nomtipo;
    console.log('nombre del user:',this.usuario.nombre); //para mmostrar si se obtuvo correctamente 
    this.loadEventos();
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

  // Función para cargar los eventos
  async loadEventos() {
    try {
      const data = await this.apiService.getEventosusuarionormal();

      if (data.length === 0) {
        console.warn('No hay eventos disponibles.');
        this.error = false;
      } else {
        this.eventos = data.map(evento =>
          ({
            name: evento.nombre || evento.title || 'Evento sin nombre',
            urlmapa: evento.urlmapa || '', // URL del mapa
          }));
        this.error = false;
      }

    } catch (error) {
      console.error('Error al cargar eventos:', error);
      this.error = true;
      this.eventos = [];
    }
  }

  // Función para manejar la selección del evento
  onEventSelect(event: Event) {
    const selectedUrl = (event.target as HTMLSelectElement).value;
    if (selectedUrl) {
      // Aquí sanitizamos la URL directamente
      this.selectedMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(selectedUrl);
    } else {
      this.selectedMapUrl = null;
    }
    console.log('Evento seleccionado:', this.selectedEvento);
    console.log('URL del mapa:', this.selectedMapUrl);
  }



  goToVolver() {
    if (this.tipoNombre === 'admin') {
      // Código a ejecutar si la condición se cumple
      this.router.navigate(['/bienvenidoadmin', this.usuario.nombre]); 
      console.log('El usuario es administrador');
    } else if (this.tipoNombre === 'persona') {
        // Código a ejecutar si la condición se cumple
        this.router.navigate(['/bienvenidopersona', this.usuario.nombre]); 
        console.log('El usuario es persona');
    } else if (this.tipoNombre === 'presiempresa') {
          // Código a ejecutar si la condición se cumple
          this.router.navigate(['/bienvenidopresidente', this.usuario.nombre]); 
      console.log('El usuario es persona');
    }
      
  }

  goToMapa() {
    this.router.navigate(['/mapa', this.usuario.nombre]);  
  }

  goToCalendario() {
    this.router.navigate(['/calendarioUser']);  
  }



}
