import { Injectable } from '@angular/core';
//usaremos la constante declarada en el json
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';

//esta anotacion es solo para clases de tipo servicio
//(logica de negocio) se puede inyectar a otros componentes via inyeccion de dependencias
@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor() {}

  //como usas arreglo de tipo cliente hay que importar la clase 
  getClientes(): Cliente[] {
    return CLIENTES;
  }
}
