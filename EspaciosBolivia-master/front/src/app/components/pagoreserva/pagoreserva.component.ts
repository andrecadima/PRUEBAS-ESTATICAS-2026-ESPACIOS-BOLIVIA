import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagoreserva',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagoreserva.component.html',
  styleUrls: ['./pagoreserva.component.css']
})
export class PagoreservaComponent  implements OnInit{
  usuario: any = {
    nombre: null,
    email:null,
    contrasena: null,
    tipousuario: null
  }//anadi una var usuario
  isDropdownOpen= false; // Estado para el dropdown
  
  constructor(private readonly route: ActivatedRoute, private readonly router: Router){}

  ngOnInit(): void {
    this.usuario.nombre = this.route.snapshot.paramMap.get('User'); // Obtén el nombre desde la URL
    console.log('Nombre del usuario:', this.usuario.nombre);

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
    this.router.navigate(['/mapa', this.usuario.nombre]);  
  }

  goToBienvenido() {
    this.router.navigate(['/bienvenidopresidente', this.usuario.nombre]);  
  }

  goToCalendario() {
    this.router.navigate(['/calendarioUser']);  
  }
  goToPermiso() {
    this.router.navigate(['/informacioneventos', this.usuario.nombre]);  
  }

}
