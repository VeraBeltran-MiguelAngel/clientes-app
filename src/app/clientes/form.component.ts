import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
//libreria Router para direccionar url
// lib ActivatedRoute para saber la ruta activa
import { Router, ActivatedRoute } from '@angular/router';
//libreria para mensajes de alerta mas bonitos
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  //Atributos de nuestra clase
  public cliente: Cliente = new Cliente();
  public titulo: string = 'Crear cliente';

  //inyectamos la clase service y el activated route (obtener id(cliente) desde la url)
  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    /*se debe colocar el metodo al cargar el componente,
     de lo contrario no muestra la informacion a editar del cliente*/
    this.cargarCliente();
  }

  /**
   * Metodo para cargar el cliente
   * Void por que solo asigna la respuesta al atributo cliente
   * Obtener el id por URL (inyectar en constructor)
   */
  cargarCliente(): void {
    /*debemos suscribir un observador que este viendo
    cuando obtengamos el id al pasarlo por parametro, recibe los 
    parametros a la funcion anonima*/
    this.activatedRoute.params.subscribe((params) => {
      //obtenemos el id
      let id = params['id'];
      //si el id existe vamos a buscar al cliente
      if (id) {
        //suscribimos para registrar el observador que asigna el cliente de la consulta al atributo cliente
        this.clienteService
          .getCliente(id)
          .subscribe((cliente) => (this.cliente = cliente));
      }
    });
  }

  public create(): void {
    /**sin implementar metodo de crear
     *console.log('Clic');
     *console.log(this.cliente);
     */

    //llamando al metodo crear(pasamos el objeto cliente y lo vamos a suscribir)
    this.clienteService.create(this.cliente).subscribe(
      //para redirigir al listado de clientes y mostrar el nuevo registro,
      // y mostrar un mensaje de confirmacion de cliente creado
      (cliente) => {
        this.router.navigate(['/clientes']);
        //creamos el alert con tres parametros (titulo,`mensaje`,tipo de mensaje)
        swal.fire(
          'Nuevo Cliente',
          `Cliente: ${cliente.nombre} creado con exito!`,
          'success'
        );
      }
    );
  }
}
