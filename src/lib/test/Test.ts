class A {
    private message: string;

    constructor() {
        this.message = "class A";
    }

    public foo() {
        console.log(this.message);
    }
}

export class B extends A {
    public foo() {
        console.log('class B');
    }
}


const a = new A();
const b = new B();

a.foo();
b.foo();