//var firstName = '1';
class Animal {

    constructor(firstName, owner){
        this.firstName = firstName;
        this.owner = owner;
    }
 
    getFirstName(){ 
        return this.firstName;
    }
     
    setFirstName(newFirstName){
        this.firstName = newFirstName;
    }
     
    getOwner(){ 
        return this.owner;
    }
     
    setOwner(newOwner){
        this.owner = newOwner;
    }

    sayHello() {
        let ini = "Hi ";
        return ini + this.firstName;
    }

    sayGoodBye = () => "Goodbye";
    
};

class Dog extends Animal {
    constructor() {
        super();
    }

    legs = () => 4; 
    static sound = () => 'Guau';
    sayGoodBye = () => self.sound();
}

class Duck extends Animal {
    constructor() {
        super();
    }

    legs = () => 2; 
    static sound = () => 'Quack';
}