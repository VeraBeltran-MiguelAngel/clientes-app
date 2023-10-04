import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
//libreria para alertas
import Swal from 'sweetalert2';

import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {
  //para poder decir que el objeto es de tipo Cliente hay que importar la clase
  /**
   * El signo de exclamación ! es una notación de "postfijo de no nulo". Indica que esta
   * variable puede ser nula (null) o indefinida (undefined) en tiempo de compilación,
   * pero el código garantiza que, en tiempo de ejecución, esta variable tendrá un valor válido
   */
  clientes!: Cliente[];

  /*tenemos que inyectar la clase de servicio con inyeccion de dependencias
  aqui se define el nombre del atributo(clienteService) y se inyecta su valor*/
  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    //en este metodo se ejecutan procesos al iniciar el componente

    /*Tenemos que suscribir o registrar el observador a nuestros clientes.
    Por lo tanto getClientes() es un observable (observado por observadores)*/
    //*aqui el pipe recibe un clientes de tipo array por que ya fue transformado en cliente.service
    this.clienteService
      .getClientes()
      .pipe(
        tap((paramClientes) => {
          console.log('ClienteService: tap 3');
          paramClientes.forEach((itemCliente) => {
            //mostramos datos de cada cliente en el log
            console.log(itemCliente.nombre);
          });
        })
      )
      .subscribe(
        /*dentro de este metodo (suscribir) el observador justamente sería asignar en el atributo
        clientes el valor que se está recibiendo desde el clienteService que sería el listado 
        de clientes con los cambios.Entonces acá tenemos una función anónima nuestro Salvador 
        que se encarga de asignar el valor al cliente component*/

        //clientes es el argumento (el resultado del stream), se asigna el parametro a this clientes
        /*esta linea seria el observador , por lo tanto actualiza el listado de clientes
         desde el cliente component y eso se pasa a la plantilla(a la vista con los posibles cambios)*/
        (clientes) => (this.clientes = clientes)

        //el argumento es el valor que se emite desde el flujo reactivo que retorna el
        //servicio(esta en cliente.service) (Observable<Cliente[]>),

        /*function(clientes){ la funcion => es igual a esto
          this se usa para referenciar a la variable global o a nivel de clase
          this.clientes = clientes
        } */
      );
  }

  delete(cliente: Cliente): void {
    //mostrar alerta de estas seguro de eliminar?
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Estas seguro?',
        text: `¿Seguro que deseas eliminar al cliente: ${cliente.nombre} ${cliente.apellido}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          //al dar clic en si procedemos a eliminar y registramos al observador
          this.clienteService.delete(cliente.id).subscribe((response) => {
            //debemos quitar del listado el cliente que se elimino para que se actualice automaticamente
            /**
             * El metodo filter de Array nos permite filtrar solo los elementos que deseamos
             * segun ciertos criterios y devolverlos en un nuevo array.
             * Cada cliente se pasa por parametro si el arg cli es distinto del cliente a eliminar
             * lo mostramos en la lista
             */
            this.clientes = this.clientes.filter((cli) => cli !== cliente);

            //como respuesta mandamos el mensaje
            swalWithBootstrapButtons.fire(
              'Cliente Eliminado!',
              `Cliente: ${cliente.nombre} eliminado con exito.`,
              'success'
            );
          });
        }
      });
  }
}
