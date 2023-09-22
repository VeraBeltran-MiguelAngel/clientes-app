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

  /*tenemos que inyectar la clase de servicio con inyeccion de dependencias
  aqui se define el nombre del atributo(clienteService) y se inyecta su valor*/
  constructor(private clienteService:ClienteService) {}

  ngOnInit(): void {
    //en este metodo se ejecutan procesos al iniciar el componente

    /*Tenemos que suscribir o registrar el observador a nuestros clientes.
    Por lo tanto getClientes() es un observable (observado por observadores)*/
    this.clienteService.getClientes().subscribe(
      /*dentro de este metodo (suscribir) el observador justamente sería asignar en el atributo
        clientes el valor que se está recibiendo desde el clienteService que sería el listado 
        de clientes con los cambios.Entonces acá tenemos una función anónima nuestro Salvador 
        que se encarga de asignar el valor al cliente component*/

        //clientes es el argumento (el resultado del stream), se asigna el parametro a this clientes
         /*esta linea seria el observador , por lo tanto actualiza el listado de clientes
         desde el cliente component y eso se pasa a la plantilla(a la vista con los posibles cambios)*/
        clientes => this.clientes = clientes 
    
        //el argumento es el valor que se emite desde el flujo reactivo que retorna el 
        //servicio(esta en cliente.service) (Observable<Cliente[]>), 

        /*function(clientes){ la funcion => es igual a esto
          this se usa para referenciar a la variable global o a nivel de clase
          this.clientes = clientes
        } */

       

    );
  }
}
