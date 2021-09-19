const checkValidNameId=():Function => {
    return function(target:any,propertyKey:string,descriptor:PropertyDescriptor){
        const originalMethod=descriptor.value;
        descriptor.value=(print:string,...restArg:string[])=>{
            if(!restArg[0]){
                return console.error('Operacion no Valida');
            }else{
                return originalMethod(print,restArg);
            }
        }
    }
}
export default checkValidNameId;