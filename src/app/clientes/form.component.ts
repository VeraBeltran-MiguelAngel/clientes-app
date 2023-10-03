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
  //Atributos de nuestra clase (viajan al form.c.html)
  public cliente: Cliente = new Cliente();
  public titulo: string = 'Crear cliente';
  //atributo con arreglo de errores
  public errores!: string[];

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
   * Metodo para cargar los datos a editar del cliente
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
        //cambiamos el titulo del fromulario
        this.titulo = 'Editar Cliente';
        //suscribimos para registrar el observador que asigna el cliente de la consulta al atributo cliente
        this.clienteService
          .getCliente(id)
          .subscribe((cliente) => (this.cliente = cliente));
      }
    });
  }

  /**
   * Metodo para crear un cliente
   */

  public create(): void {
    /**sin implementar metodo de crear
     *console.log('Clic');
     *console.log(this.cliente);
     */
    //llamando al metodo crear(pasamos el objeto cliente y lo vamos a suscribir)
    this.clienteService.create(this.cliente).subscribe({
      //para redirigir al listado de clientes y mostrar el nuevo registro,
      // y mostrar un mensaje de confirmacion de cliente creado
      // funcion flecha con parametro (este parametro es de cualquier tipo) para
      //tener acceso al atributo cliente que se envia en el MAP del backend
      next: (json) => {
        this.router.navigate(['/clientes']);
        //creamos el alert con tres parametros (titulo,`mensaje`,tipo de mensaje)
        swal.fire(
          'Nuevo Cliente',
          `${json.mensaje}: ${json.cliente.nombre}`,
          'success'
        );
      }, //2°parametro del subscribe
      error: (paramErr) => {
        //pasar los errores al atributo 'errores'
        this.errores = paramErr.error.errors as string[];
        console.error('Código del error desde el backend' + paramErr.status);
        console.error(paramErr.error.errors);
      },
    });
  }

  /**
   * Metodo Actualizar cliente
   */
  update(): void {
    //procedemos a suscribir para registrar el observador
    // despues de actualizar redirigimos al listado con un mensaje de exito
    this.clienteService.update(this.cliente).subscribe({
      next:(cliente) => {
        this.router.navigate(['/clientes']);
        //creamos el alert
        swal.fire(
          'Cliente Actualizado',
          `Cliente ${cliente.nombre} actualizado con exito!`,
          'success'
        );
      }, //2°parametro del subscribe
      error:(paramErr) => {
        //pasar los errores al atributo 'errores'
        this.errores = paramErr.error.errors as string[];
        console.error('Código del error desde el backend' + paramErr.status);
        console.error(paramErr.error.errors);
      }
  });
  }
}
