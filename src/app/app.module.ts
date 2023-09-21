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

@NgModule({
  //siempre se deben poner los nuevo componentes aqui 
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  //aqui se registran clases de servicio
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
