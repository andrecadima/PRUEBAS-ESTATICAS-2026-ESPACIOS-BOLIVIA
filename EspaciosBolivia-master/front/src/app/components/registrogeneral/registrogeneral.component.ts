import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Router  } from '@angular/router';

import { FormsModule } from '@angular/forms'; // Importar FormsModule para [(ngModel)]
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registrogeneral',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './registrogeneral.component.html',
  styleUrls: ['./registrogeneral.component.css']
})

export class RegistrogeneralComponent 
{
  nombre: string = '';
  contrasena: string = '';
  email:string = '';
  numcontacto: number = 0;
  tipousuario: string = '';
  mensajeError = '';
  passwordVisible: boolean = false; 

  constructor(private readonly authService: AuthService, private readonly router: Router) {}
  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  registrar() 
  {
    const usuarios = {
      nombre: this.nombre,
      contrasena: this.contrasena,
      email: this.email,
      numcontacto: this.numcontacto,
      tipousuario: this.tipousuario
    }; 
    
    this.authService.registrarusuario(usuarios).subscribe({
      next: (respuesta) => {

        console.log('Registro de usuario exitoso:', respuesta);
        if (['Presidente OTB', 'Empresa', 'Usuario', 'Admin'].includes(this.tipousuario)) {
          this.router.navigate(['/condiciones']);
        }
      },
      error: (error) => {
        console.error('Error al registrar usuario:', error);
        this.mensajeError = 'Datos incorrectos.';
        alert(this.mensajeError);
      }
    });
  }
}
