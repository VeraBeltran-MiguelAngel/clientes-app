import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {
  //para poder decir que el objeto de de tipo Cliente hay que importar la clase
  clientes: Cliente[] = [
    {
      id: 1,
      nombre: 'Andres',
      apellido: 'Guzman',
      email: 'profesor@bolsadeideas.com',
      createAt: '2017-12-11',
    },
    {
      id: 2,
      nombre: 'Andres2',
      apellido: 'Guzman2',
      email: 'profesor2@bolsadeideas.com',
      createAt: '2018-12-11',
    },
    {
      id: 3,
      nombre: 'Andres3',
      apellido: 'Guzman3',
      email: 'profesor3@bolsadeideas.com',
      createAt: '2019-12-11',
    },
    {
      id: 4,
      nombre: 'Andres4',
      apellido: 'Guzman4',
      email: 'profesor4@bolsadeideas.com',
      createAt: '2020-12-11',
    },
    {
      id: 5,
      nombre: 'Andres5',
      apellido: 'Guzman5',
      email: 'profesor5@bolsadeideas.com',
      createAt: '2021-12-11',
    },
    {
      id: 6,
      nombre: 'Andres6',
      apellido: 'Guzman6',
      email: 'profesor6@bolsadeideas.com',
      createAt: '2022-12-11',
    },
    {
      id: 7,
      nombre: 'Andres7',
      apellido: 'Guzman7',
      email: 'profesor7@bolsadeideas.com',
      createAt: '2023-12-11',
    },
    {
      id: 8,
      nombre: 'Andres8',
      apellido: 'Guzman8',
      email: 'profesor8@bolsadeideas.com',
      createAt: '2024-12-11',
    }
  ];
  constructor() {}

  ngOnInit(): void {}
}
