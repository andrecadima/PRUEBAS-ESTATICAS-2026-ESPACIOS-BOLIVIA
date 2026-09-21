import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bienvenidoregistro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bienvenidoregistro.component.html',
  styleUrls: ['./bienvenidoregistro.component.css'],
})

export class BienvenidoregistroComponent implements OnInit {
  usuario: any = {
    nombre: null,
    email:null,
    contrasena: null,
    tipousuario: null
  }//anadi una var usuario
  eventos: any[] = [];
  isDropdownOpen= false; // Estado para el dropdown
  tipo: string = 'presiempresa';

  constructor(private apiService: ApiService, private readonly route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.usuario.nombre = this.route.snapshot.paramMap.get('User'); // Obtén el nombre desde la URL
    console.log('Nombre del usuario:', this.usuario.nombre);
  
    if (this.usuario.nombre) {
      this.loadEventos(); // Carga los eventos solo si se obtuvo el nombre
    } else {
      console.error('No se pudo obtener el nombre del usuario de la URL.');
    }
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
  
  async loadEventos() {
    try {
      this.eventos = await this.apiService.getEventoscreador(this.usuario.nombre);
      console.log('Eventos cargados:', this.eventos);
    } catch (error) {
      console.error('Error al cargar los eventos:', error);
    }
  } 
  
  verEvento(idEvento: number) {
    this.router.navigate(['/verevento',this.usuario.nombre, idEvento]);
  }

  goToRegistrar() {
    this.router.navigate(['/registroevento1', this.usuario.nombre]);  
  }

  goToMapa() {
    this.router.navigate(['/mapa', this.usuario.nombre, this.tipo]);  
  }

  goToBienvenido() {
    this.router.navigate(['/bienvenidopresidente', this.usuario.nombre]);  
  }

  goToCalendario() {
    this.router.navigate(['/calendarioUser']);  
  }

}
