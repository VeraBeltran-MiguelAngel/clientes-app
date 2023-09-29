import { Injectable } from '@angular/core';
//usaremos la constante declarada en el json(arreglo de clientes) forma estatica
//import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
//para poder manejar peticiones en tiempo real (asincrono)
import { Observable } from 'rxjs';
// el metodo of es para crear el flujo observable
//import { of } from 'rxjs';

//para la 2° forma de mostrar la lista de clientes
import { map } from 'rxjs/operators';

/**
 * 1 ° En nuestra clase de servicio debemos importar el metodo http
 * para que se muestren los clientes de forma dinamica(con el api rest)
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierName } from '@angular/compiler';

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
   */
  constructor(private http: HttpClient) {}

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
   */
  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {
      headers: this.httpHeaders,
    });
  }

  /**
   * Metodo para obtener los datos a editar del cliente
   * Creamos un observable de un solo cliente (un arreglo de clientes no)
   */
  getCliente(id: Cliente): Observable<Cliente> {
    //usaremos el string de interpolacion para pasar el id a la url del endpoit
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);
  }

  /**
   * Metodo para actualizar los datos del cliente
   */
  update(cliente: Cliente): Observable<Cliente> {
    // put se usa para actualizar datos en el servidor REST.
    //A diferencia de POSTque es para crear, el 1° arg es la url como 2° argumento
    //pasamos el cliente a modificar y el 3° arg son los header
    return this.http.put<Cliente>(
      `${this.urlEndPoint}/${cliente.id}`,
      cliente,
      {
        headers: this.httpHeaders,
      }
    );
  }

  /**
   * Metodo para eleiminar cliente
   */
  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {
      headers: this.httpHeaders,
    });
  }
}
