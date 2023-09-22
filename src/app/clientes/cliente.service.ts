import { Injectable } from '@angular/core';
//usaremos la constante declarada en el json(arreglo de clientes)
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
//para poder manejar peticiones en tiempo real (asincrono)
import { Observable } from 'rxjs';
// el metodo of es para crear el flujo observable
import { of } from 'rxjs';

//esta anotacion es solo para clases de tipo servicio
//(logica de negocio) se puede inyectar a otros componentes via inyeccion de dependencias a una clase component
@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor() {}

  /*como usas arreglo de tipo cliente hay que importar la clase 
  lo que retorna el metodo tiene que ser un stream (flujo de datos) por lo tanto un observable de clientes*/
  getClientes(): Observable<Cliente[]> {
    //tenemos que convertir el arreglo de clientes en un observable para que coincidan los tipos
    // -- Convertimos / creamos nuestro flujo observable a partir de los objetos clientes
    return of(CLIENTES);
  }
}
