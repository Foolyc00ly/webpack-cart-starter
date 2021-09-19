import checkValidNameId from "../config/decorators";
/* interface Persona{nombre:string;apellido:string;pais:string;}; */
class Operacion{
/*     constructor(nombre:string,apellido:string,pais:string){}
    static _Operacion({nombre,apellido,pais}:Persona){
        return new Operacion(nombre,apellido,pais);
    } */
    @checkValidNameId()
    ingreso(print:string,...restArg:string[]){
        return console.log(`${print} ${restArg.join(' ')}`);
    }
}

export default Operacion;