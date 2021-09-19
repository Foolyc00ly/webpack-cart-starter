class DemoClassTest {
    public constructor(x : string, y:string);
    public constructor(x : number);
    public constructor(x : number, y:string, z:string);
    public constructor(...myarray: any[]) {
        if (myarray.length === 2) {
            console.log("arugument length is :: " + myarray.length)
            console.log('two argument constructor called here !!');
            return;
        }
        if (myarray.length === 3) {
            console.log("arugument length is :: " + myarray.length)
            console.log('three argument constructor called here !!');
            return;
        }
        if (myarray.length === 1) {
            console.log("arugument length is :: " + myarray.length)
            console.log('one argument constructor called here !!');
            return;
        }
    }
}
    console.log("Example to show multiple constructor support in Typescript !!")
    let result1 = new DemoClassTest('hello', 'bye');
    let result2 = new DemoClassTest(1);
    let result3 = new DemoClassTest(100, 'str1', 'str2');
    console.log("Printing result here !!")
    console.log( "result one is :::" + result1)
    console.log("result two is :::" +result2)
    console.log("result three is :::" +result3)