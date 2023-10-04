//locale ID para usar formato de fechas en html y se vea en español
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component'; //añadimos el nuevo componente
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
//agregamos clases de servicio
import { ClienteService } from './clientes/cliente.service';
//para poder ligar nuestras rutas de paginas
import { RouterModule, Routes } from '@angular/router';
/**
 * 1° importar componente de angular para la comunicación con el servidor
 * remoto a traves de peticiones HTTP (get,post,delete,put)
 */
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './clientes/form.component';

//Para poder trabajar con formularios
import { FormsModule } from '@angular/forms';
//usamos dos formas de dar formato a la fecha del backend
import { registerLocaleData } from '@angular/common';
//importar nuestro locale español para que no se ve en ingles las fechas
import localeEs from '@angular/common/locales/es-MX';

//hay que registrar la hora local en español
registerLocaleData(localeEs, 'es');

/* constante que contiene un arreglo con las rutas, aqui 
estan definidas todos los url de cada componente
Ej: path es la ruta y va mapeado al componente. El path vacio
es el home y redirige a clientes y hace match completo con la url*/
const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'directivas', component: DirectivaComponent },
  { path: 'clientes', component: ClientesComponent }, //listado de clientes
  { path: 'clientes/form', component: FormComponent }, //ruta para abrir el formulario crear
  { path: 'clientes/form/:id', component: FormComponent }, //formulario editar
];
@NgModule({
  //siempre se deben poner los nuevo componentes aqui
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
  ],
  /*debemos registrar nuestras rutas por eso usamos
  el RouterModule con la constante 'routes'
  2° Despues del impor de http debe registrarse en los imports*/
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, //queda registrado el modulo para trabajar con formularios
    AppRoutingModule,
    RouterModule.forRoot(routes),
  ],
  //aqui se registran clases de servicio, y la variable locale para ver en español formatos de fecha en html
  providers: [ClienteService, { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
