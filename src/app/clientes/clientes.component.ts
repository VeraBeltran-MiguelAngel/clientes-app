import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {
  //para poder decir que el objeto de de tipo Cliente hay que importar la clase
  clientes: Cliente[] | undefined;

//aqui se define el atributo y se inyecta su valor
  constructor(private clienteService:ClienteService) {}

  ngOnInit(): void {
    //en este metodo se ejecutan procesos al iniciar el componente

    //aqui asignamos el metodo get clientes de la clase de servicio 
    this.clientes = this.clienteService.getClientes();
  }
}
