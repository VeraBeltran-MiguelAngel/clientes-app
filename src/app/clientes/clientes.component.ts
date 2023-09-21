import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
//usaremos la constante declarada en el json
import { CLIENTES } from './clientes.json';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {
  //para poder decir que el objeto de de tipo Cliente hay que importar la clase
  clientes: Cliente[] | undefined;

  constructor() {}

  ngOnInit(): void {
    //en este metodo se ejecutan procesos al iniciar el componente

    //aqui asignamos la constante a nuestro arreglo
    this.clientes = CLIENTES;
  }
}
