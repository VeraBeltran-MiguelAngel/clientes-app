import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  //Atributos de nuestra clase
  public cliente: Cliente = new Cliente();
  public titulo: string = 'Crear cliente';

  constructor() {}

  ngOnInit(): void {}

  public create(): void {
    console.log('Clic');
    console.log(this.cliente);
  }
}
