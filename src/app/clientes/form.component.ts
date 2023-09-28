import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  //Atributos de nuestra clase
  public cliente: Cliente = new Cliente();
  public titulo: string = 'Crear cliente';

  //inyectamos la clase service
  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {}

  public create(): void {
    /**sin implementar metodo de crear
     *console.log('Clic');
     *console.log(this.cliente);
     */

    //llamando al metodo crear(pasamos el objeto cliente y lo vamos a suscribir)
    this.clienteService.create(this.cliente).subscribe(
      //para redirigir al listado de clientes y subir los cambios
      (response) => this.router.navigate(['/clientes'])
    );
  }
}
