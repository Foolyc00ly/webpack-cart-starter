/* interface Persona{
    nombre:string;
    edad:number;
    imprimir?():void;
}
interface Person{
    (n:string,e:number):void;
}
const brad:Persona={
    nombre:'Brad',
    edad:30,
    imprimir(){
        console.log(`El nombre es ${this.nombre}`);
    }
}
const Mia:Persona={
    nombre:'Mía',
    edad:17
}

function Persona(nombre:string,edad:number){
    this.nombre=nombre;
    this.edad=edad;
    this.imprimir=function(){
        console.log(`El nombre es ${this.nombre}`);
    }
    console.log('Se ejecuto esta línea');
}
const maria=new Persona('María',18); */