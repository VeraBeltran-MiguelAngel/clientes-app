export class Cliente {
  /**
   * El signo de exclamación ! es una notación de "postfijo de no nulo". Indica que esta
   * variable puede ser nula (null) o indefinida (undefined) en tiempo de compilación,
   * pero el código garantiza que, en tiempo de ejecución, esta variable tendrá un valor válido
   */
  id!: number;
  nombre!: string;
  apellido!: string;
  createAt!: string;
  email!: string;
}
