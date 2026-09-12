import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderListModule } from 'primeng/orderlist';
import { MapaeventosModule } from './mapaeventos/mapaeventos.module';
import { FormsModule } from '@angular/forms';

// Importa tu componente
import { VerEventoPresiComponent } from './components/ver-evento-presi/ver-evento-presi.component';

@NgModule({
  declarations: [
    AppComponent,
    VerEventoPresiComponent  // Asegúrate de declarar tu componente aquí
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DropdownModule,
    OrderListModule,
    MapaeventosModule,
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
