import { Route } from '@angular/router';
import { HomeComponent } from './components/home/home.component'; 
import { RegistrogeneralComponent } from './components/registrogeneral/registrogeneral.component';
import { FinregistroComponent } from './components/finregistro/finregistro.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { BienvenidoregistroComponent } from './components/bienvenidoregistro/bienvenidoregistro.component';
import { RegistroeventoComponent } from './components/registroevento/registroevento.component';
import { MapaeventosComponent } from './components/mapaeventos/mapaeventos.component';
import { TerminosycondicionesComponent } from './components/terminosycondiciones/terminosycondiciones.component';
import { PermisosdeeventoComponent } from './components/permisosdeevento/permisosdeevento.component';
import { QreventosComponent } from './components/qreventos/qreventos.component';
import { PagoexitosoComponent } from './components/pagoexitoso/pagoexitoso.component';
import { PagoreservaComponent } from './components/pagoreserva/pagoreserva.component';
import { AprobacioneventosComponent } from './components/aprobacioneventos/aprobacioneventos.component';
import { IniciopaginaComponent } from './components/iniciopagina/iniciopagina.component';
import { IniciosesionComponent } from './components/iniciosesion/iniciosesion.component';
import { BienvenidoadminComponent } from './components/bienvenidoadmin/bienvenidoadmin.component';
import { BienvenidopersonaComponent } from './components/bienvenidopersona/bienvenidopersona.component';
import { VerEventoPresiComponent } from './components/ver-evento-presi/ver-evento-presi.component';
import { CalendarioUserComponent } from './components/calendario-user/calendario-user.component';

export const APP_ROUTES: Route[] = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige al inicio
  { path: 'home', component: HomeComponent }, // Ruta para la página 1
  { path: 'iniciopagina', component: IniciopaginaComponent},
  { path: 'iniciosesion', component: IniciosesionComponent},
  { path: 'registrogeneral', component: RegistrogeneralComponent },  
  { path: 'finregistro', component: FinregistroComponent},
  { path: 'calendario', component: CalendarioComponent},
  { path: 'condiciones', component: TerminosycondicionesComponent},
  { path: 'aprobacioneventos', component: AprobacioneventosComponent},
  { path: 'bienvenidopresidente/:User', component: BienvenidoregistroComponent}, //aumente User para pasar nombre de usuario
  { path: 'bienvenidopersona/:User', component: BienvenidopersonaComponent}, //aumente User para pasar nombre de usuario
  { path: 'bienvenidoadmin/:User', component: BienvenidoadminComponent},
  { path: 'verevento/:User/:id', component: VerEventoPresiComponent},
  { path: 'mapa/:User/:Tipo', component: MapaeventosComponent},
  { path: 'registroevento1/:User', component: RegistroeventoComponent},//aumento para pasar user a registrar evento
  { path: 'qrreserva/:User', component: QreventosComponent},
  { path: 'pagoreserva/:User', component: PagoreservaComponent},
  { path: 'pagoexitoso', component: PagoexitosoComponent},
  { path: 'informacioneventos/:User', component: PermisosdeeventoComponent},
  { path: 'calendarioUser', component: CalendarioUserComponent}
];