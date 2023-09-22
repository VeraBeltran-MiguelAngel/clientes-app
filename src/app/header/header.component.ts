import { Component } from '@angular/core';

//componente creado manualmente el selector es la forma de llamar dicho componente
@Component({
  selector: 'app-header',
  //caracter multi linea `` para el contenido html
  templateUrl:'./header.component.html'
  
})
export class HeaderComponent {
  //para qe se pueda exportar la clase en el app module
  title:string | undefined = 'App-Angular';
  
}
