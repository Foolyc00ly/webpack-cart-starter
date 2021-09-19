import Operacion from './restArg';
let nombre:string='Mía';
const nombres:Operacion=new Operacion();
export const cadena=():void=>nombres.ingreso(nombre,'Sofia','ama');
export const copia:void=nombres.ingreso(nombre,'Sofia','ama');
