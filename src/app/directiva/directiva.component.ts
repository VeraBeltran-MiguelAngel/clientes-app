import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
})
export class DirectivaComponent {
  listaCurso: string[] = ['TypeScript', 'JavaScript', 'Java SE', 'C#', 'PHP'];
  habilitar: boolean = true;
  constructor() {}
  //metodo que evalua el boton habilitar , es void por que no retorna nada
  setHabilitar(): void {
    this.habilitar = this.habilitar == true ? false : true;
  }
}
