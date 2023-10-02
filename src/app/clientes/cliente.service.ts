import { Injectable } from '@angular/core';
//usaremos la constante declarada en el json(arreglo de clientes) forma estatica
//import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
//para poder manejar peticiones en tiempo real (asincrono)
//throwErro para poner el error en un observable
import { Observable, throwError } from 'rxjs';
// el metodo of es para crear el flujo observable
//import { of } from 'rxjs';

//para la 2° forma de mostrar la lista de clientes, catch puede
//interceptar el observable para buscar fallas
import { map, catchError } from 'rxjs/operators';

/**
 * 1 ° En nuestra clase de servicio debemos importar el metodo http
 * para que se muestren los clientes de forma dinamica(con el api rest)
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import swal from 'sweetalert2';
import { Router } from '@angular/router'; //para redirigir paginas

//esta anotacion es solo para clases de tipo servicio
//(logica de negocio) se puede inyectar a otros componentes via inyeccion de dependencias a una clase component
@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  //atributos de la clase
  // Aqui hacemos referencia a nuestro api rest
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  //atributo para las cabeceras (por constructor pasamos el content type)
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  /**
   * 2° Inyectamos el objeto/dependencia HttpClient via constructor
   * Para eso creamos la variable 'http' que es de tipo HttpClient
   * tambien el router para redirigir a otra pagina
   */
  constructor(private http: HttpClient, private router: Router) {}

  /*Metodo para listar los clientes
  como usas arreglo de tipo cliente hay que importar la clase 
  lo que retorna el metodo tiene que ser un stream (flujo de datos) por lo tanto un observable de clientes*/
  getClientes(): Observable<Cliente[]> {
    /*tenemos que convertir el arreglo de clientes en un observable para que coincidan los tipos
    Convertimos / creamos nuestro flujo observable a partir de los objetos clientes
    return of(CLIENTES);
    */

    // 1° forma de obtener el listado de clientes del back (retorna un observable de tipo generico)
    // debes hacer un cast para que sea de tipo cliente
    return this.http.get<Cliente[]>(this.urlEndPoint);

    /**
     * Para la 2° forma
     
    return this.http
      .get(this.urlEndPoint) //argumento => return
      .pipe(map((response) => response as Cliente[]));

      */
  }

  /**
   * Metodo para crear el cliente
   * @param cliente
   * @returns observable de tipo any ya que en el back estamos retornando un Map y no un objeto cliente
   */
  create(cliente: Cliente): Observable<any> {
    return this.http
      .post<any>(this.urlEndPoint, cliente, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          console.error(e.error.mensaje);
          //mostrar error al usuario(usamos id del map del back)
          swal.fire(e.error.mensaje, e.error.error, 'error');
          //retornar el objeto de error convertido a observable para mantener el mismo tipo del metodo create
          return throwError(() => e);
        })
      );
  }

  /**
   * Metodo para obtener los datos a editar del cliente
   * Creamos un observable de un solo cliente (un arreglo de clientes no)
   */
  getCliente(id: Cliente): Observable<Cliente> {
    //usaremos el string de interpolacion para pasar el id a la url del endpoit
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        //manejamos el error a traves del estado del estatus de la respuesta, usamos
        //la variable mensaje que esta en el map del backend
        swal.fire('Error al editar', e.error.mensaje, 'error');
        //tenemos que retornar el lanzamiento del error en un observable
        return throwError(() => e);
      })
    );
  }

  /**
   * Metodo para actualizar los datos del cliente
   * @param cliente
   * @returns observable de tipo cliente dbemos transformar la respuesta de forma manual sin el cast
   * usando el map
   */
  update(cliente: Cliente): Observable<Cliente> {
    // put se usa para actualizar datos en el servidor REST.
    //A diferencia de POSTque es para crear, el 1° arg es la url como 2° argumento
    //pasamos el cliente a modificar y el 3° arg son los header
    return this.http
      .put(`${this.urlEndPoint}/${cliente.id}`, cliente, {
        headers: this.httpHeaders,
      })
      .pipe(
        /*el parametro response es generico para poder tener acceso al MAP que viene del backend
        hacemos referencia al atributo cliente de ese MAP que en el fondo es un json */
        map((response: any) => response.cliente as Cliente),
        catchError((e) => {
          console.error(e.error.mensaje);
          //mostrar error al usuario(usamos id del map del back)
          swal.fire(e.error.mensaje, e.error.error, 'error');
          //retornar el objeto de error convertido a observable para mantener el mismo tipo del metodo create
          return throwError(() => e);
        })
      );
  }

  /**
   * Metodo para eleiminar cliente
   * (se decide usar unknown en vez de number)
   * unknown es un tipo más seguro que any. Representa un valor cuyo tipo no se conoce
   * en tiempo de compilación, pero el compilador TypeScript requiere que realices una
   * comprobación de tipo antes de realizar operaciones en él.
   */
  delete(id: unknown): Observable<Cliente> {
    return this.http
      .delete<Cliente>(`${this.urlEndPoint}/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          console.error(e.error.mensaje);
          //mostrar error al usuario(usamos id del map del back)
          swal.fire(e.error.mensaje, e.error.error, 'error');
          //retornar el objeto de error convertido a observable para mantener el mismo tipo del metodo create
          return throwError(() => e);
        })
      );
  }
}
