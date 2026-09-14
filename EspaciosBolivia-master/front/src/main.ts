import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app-routing.module';

try {
  await bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Proveedor para HttpClient
    provideRouter(APP_ROUTES), // Configuración de rutas
  ],
  });
} catch (err) {
  console.error(err);
}
