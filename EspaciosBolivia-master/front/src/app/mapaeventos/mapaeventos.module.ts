import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de que CommonModule está importado
import { MapaeventosComponent } from '../components/mapaeventos/mapaeventos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { OrderListModule } from 'primeng/orderlist';

@NgModule({
  declarations: [MapaeventosComponent],
  imports: [
    CommonModule, // Importa CommonModule para las directivas ngIf y ngFor
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    OrderListModule
  ],
  exports: [MapaeventosComponent] // Exportar el componente si se necesita en otro módulo
})
export class MapaeventosModule { }
