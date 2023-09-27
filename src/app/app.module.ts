import { NgModule } from '@angular/core';
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

/* constante que contiene un arreglo con las rutas, aqui 
estan definidas todos los url de cada componente
Ej: path es la ruta y va mapeado al componente. El path vacio
es el home y redirige a clientes y hace match completo con la url*/
const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'directivas', component: DirectivaComponent },
  { path: 'clientes', component: ClientesComponent },
];
@NgModule({
  //siempre se deben poner los nuevo componentes aqui
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
  ],
  /*debemos registrar nuestras rutas por eso usamos
  el RouterModule con la constante 'routes'
  2° Despues del impor de http debe registrarse en los imports*/
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
  ],
  //aqui se registran clases de servicio
  providers: [ClienteService],
  bootstrap: [AppComponent],
})
export class AppModule {}
