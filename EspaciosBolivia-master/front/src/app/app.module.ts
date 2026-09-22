import { NgModule } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderListModule } from 'primeng/orderlist';

// Importa tu componente
import { VerEventoPresiComponent } from './components/ver-evento-presi/ver-evento-presi.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DropdownModule,
    OrderListModule,
    VerEventoPresiComponent
  ],
  providers: [AuthService]
})
export class AppModule {}

bootstrapApplication(AppComponent, {
  providers: [AuthService]
});
