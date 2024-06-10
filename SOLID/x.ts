// Singleton design pattern for single class reference  (design pattern)
class GenrateId {
    private id: number = 1;
    private static instance: GenrateId;

    static getInstance(): GenrateId {
        if (!this.instance) {
            this.instance = new GenrateId()
        }
        return this.instance;
    }
    getId(): number {
        return this.id++
    }
}

// Single responsibility priciple - any class/function/module (unit-of-code) should have a single, well-defined responsibiity
class ZooEntity {
    name: string;
    age: number;
    gender: string

    constructor(name: string, age: number, gender: string) {
        this.name = name;
        this.age = age;
        this.gender = gender
    }

    getDetails() {
        return 'name ' + this.name + 'age ' + this.age + 'gender ' + this.gender
    }
}
class Visitor extends ZooEntity {
    ticketId: number;
    isVip: boolean;
    inTime: Date
    outTime: Date | undefined

    constructor(name: string, age: number, gender: string, isVip: boolean) {
        super(name, age, gender)
        this.isVip = isVip
        this.ticketId = GenrateId.getInstance().getId()
        this.inTime = new Date()
    }

    updateOutTime() {
        this.outTime = new Date()
    }

    isAdult() {
        return this.age >= 18
    }
}
class Staff extends ZooEntity {
    staffId: string
    salary: number
    department: string
    maritalStatus: boolean

    constructor(name: string, age: number, gender: string, salary: number, department: string, maritalStatus: boolean) {
        super(name, age, gender)
        this.staffId = `${this.name} ${GenrateId.getInstance().getId()}`
        this.salary = salary
        this.department = department
        this.maritalStatus = maritalStatus
    }

    staffSalary() {
        return this.salary
    }

    staffDepartment() {
        return this.department
    }

    married() {
        return this.maritalStatus
    }
}

class Animal extends ZooEntity {
    isVegtarian: boolean
    canBreathUnderWater: boolean
    playfullAnimal: boolean
    animalId: string
    canFly: boolean
    ate: boolean;
    species: string

    constructor(name: string, age: number, gender: string, species: string, canFly: boolean, isVegtarian: boolean, ate: boolean, canBreathUnderWater: boolean, playfullAnimal: boolean) {
        super(name, age, gender)
        this.ate = ate
        this.species = species
        this.canFly = canFly
        this.isVegtarian = isVegtarian
        this.canBreathUnderWater = canBreathUnderWater
        this.playfullAnimal = playfullAnimal
        this.animalId = `${this.name} ${GenrateId.getInstance().getId()}`
    }

    eat() {
        return this.ate
    }

    vegtarian() {
        return this.isVegtarian
    }
}

// open closed principle - your code should be closed for modification, but still, remain open to extension!
// before
class Bird extends Animal {
    beakLength: number
    wingSpan: number
    constructor(name: string, age: number, gender: string, species: string, canFly: boolean, isVegtarian: boolean, ate: boolean, canBreathUnderWater: boolean, playfullAnimal: boolean, beakLength: number, wingSpan: number) {
        super(name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal)
        this.beakLength = beakLength
        this.wingSpan = wingSpan
    }
    // fly() {
    //     let flyType = ''
    //     if (this.species === 'pigeon') {
    //         flyType = 'flap wings, i can fly'
    //     }
    //     else if (this.species === 'eagle') {
    //         flyType = 'spread wings and glide elegantly'
    //     }
    //     else if (this.species === 'penguin') {
    //         flyType = "bro, i can't fly"
    //     }
    //     return flyType
    // }

    // swim() {
    //     let flyType = ''
    //     if (this.species === 'pigeon') {
    //         flyType = 'no bro!'
    //     }
    //     else if (this.species === 'eagle') {
    //         flyType = 'no bro!'
    //     }
    //     else if (this.species === 'penguin') {
    //         flyType = "bro, i can"
    //     }
    //     return flyType
    // }
}

// open closed principle
// after
class Pigeon extends Bird {
    constructor(name: string, age: number, gender: string, species: string, canFly: boolean, isVegtarian: boolean, ate: boolean, canBreathUnderWater: boolean, playfullAnimal: boolean, beakLength: number, wingSpan: number) {
        super(name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal, beakLength, wingSpan)
    }
    flyingType() {
        return 'flap wings, i can fly'
    }
    swim() {
        return 'no bro!'
    }
}

class Eagle extends Bird {
    constructor(name: string, age: number, gender: string, species: string, canFly: boolean, isVegtarian: boolean, ate: boolean, canBreathUnderWater: boolean, playfullAnimal: boolean, beakLength: number, wingSpan: number) {
        super(name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal, beakLength, wingSpan)
    }
    flyingType() {
        return 'spread wings and glide elegantly'
    }
    swim() {
        return 'no bro!'
    }
}


// Liskov's Substitution Principle - Any object of a `class child extends Parent` should be able to replace any object of a `class parent` without any issues
// child classes should NOT violate expectations set by the parents

// before 
// In this example, Penguin inherits from Bird but cannot fly. Calling fly on a Penguin instance results in an error, breaking the substitution principle. A Penguin cannot be substituted for a Bird without altering the behavior of the program.
class Penguin extends Bird {
    constructor(name: string, age: number, gender: string, species: string, canFly: boolean, isVegtarian: boolean, ate: boolean, canBreathUnderWater: boolean, playfullAnimal: boolean, beakLength: number, wingSpan: number) {
        super(name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal, beakLength, wingSpan)
    }
    flyingType() {
        return '!!!!!!!'
    }
    swim() {
        return 'bro, i can swim '
    }
}

// Example
// class Bird {
//     fly(): string {
//         return 'I can fly';
//     }
// }

// class Penguin extends Bird {
//     // Penguins can't fly, but we're forced to override this method.
//     fly(): string {
//         throw new Error("I can't fly");
//     }
// }

// function letBirdFly(bird: Bird) {
//     console.log(bird.fly());
// }

// let penguin = new Penguin();
// letBirdFly(penguin); // This will throw an error

// Penguin,kiwi class should not have a method related to flying because they cannot fly, so we should use interface

//after
interface IcanFly {
    flyingType(): string;
    spreadWings(): boolean;
    flapWings(): string
}

interface swimable {
    swim(): string;
}

class Penguin1 extends Bird implements swimable {
    constructor(name: string, age: number, gender: string, species: string, canFly: boolean, isVegtarian: boolean, ate: boolean, canBreathUnderWater: boolean, playfullAnimal: boolean, beakLength: number, wingSpan: number) {
        super(name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal, beakLength, wingSpan)
    }
    swim() {
        return 'bro, i can swim '
    }
}

class Pigeon2 extends Bird implements IcanFly {
    constructor(name: string, age: number, gender: string, species: string, canFly: boolean, isVegtarian: boolean, ate: boolean, canBreathUnderWater: boolean, playfullAnimal: boolean, beakLength: number, wingSpan: number) {
        super(name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal, beakLength, wingSpan)
    }
    flyingType() {
        return 'flap wings, i can fly'
    }
    spreadWings() {
        return true
    }
    flapWings() {
        return 'yes, faslty!'
    }
}

class Eagle2 extends Bird implements IcanFly {
    constructor(name: string, age: number, gender: string, species: string, canFly: boolean, isVegtarian: boolean, ate: boolean, canBreathUnderWater: boolean, playfullAnimal: boolean, beakLength: number, wingSpan: number) {
        super(name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal, beakLength, wingSpan)
    }
    flyingType() {
        return 'spread wings and glide elegantly'
    }
    spreadWings() {
        return true
    }
    flapWings() {
        return 'yes,glide elegantly and flap faslty!'
    }
}

// Interface Segregation Principle - Keep your interfaces minimal
// The clients of your interface (other pieces of code that implement your interface) should not be forced to implement methods that they don't need

// Single Responsibility - general principle
//Liskov Substitution - type hierarchy (mathematical principle)
//SRP vs ISP => ISP can apply to APIs as well, not just classes
// All SOLID principles are tightly linked to each other. You see view them

// split then interface based on the usecase (superman,skathiman also can fly but they don't have a wings)
interface flyingType {
    flyingType(): string
}

interface IhasSuperBreath {
    superBreath(): string
}

interface IhasWings {
    flapWings(): string
    spreadWings(): boolean
}
class superman extends Bird implements flyingType, IhasSuperBreath {
    constructor(name: string, age: number, gender: string, species: string, canFly: boolean, isVegtarian: boolean, ate: boolean, canBreathUnderWater: boolean, playfullAnimal: boolean, beakLength: number, wingSpan: number) {
        super(name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal, beakLength, wingSpan)
    }
    flyingType() {
        return "combination of powers he derives from Earth's “yellow” Sun and from his extraterrestrial biology"
    }
    superBreath() {
        return "Superman's breath was capable of freezing objects and generating hurricane-force winds."
    }
}
class Eagle3 extends Bird implements IhasWings {
    constructor(name: string, age: number, gender: string, species: string, canFly: boolean, isVegtarian: boolean, ate: boolean, canBreathUnderWater: boolean, playfullAnimal: boolean, beakLength: number, wingSpan: number) {
        super(name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal, beakLength, wingSpan)
    }
    flyingType() {
        return 'spread wings and glide elegantly'
    }
    spreadWings() {
        return true
    }
    flapWings() {
        return 'yes,glide elegantly and flap faslty!'
    }
}

// Dependency Inversion Principle - any code (high/low level) should NEVER depend on low level implementation details

// payment method - simple example

// before
class CreditCard {  // Low level module
    makePayment() {
        return 'payment method completed using credit card'
    }
}

class Store { // High level module
    processPayment: CreditCard
    constructor() {
        this.processPayment = new CreditCard()
    }
    payBill() {
        return this.processPayment.makePayment()
    }
}

new Store().payBill()

// In this example store is tigtly coupled  with CreditCard. if we want to add the new payment method we should rewrite the store class it's against to the OCP 

// after - DIP
interface PaymentMethod {
    processPayment(amount: number): void
}

class CreditCard1 implements PaymentMethod {  // Low level module
    processPayment(amount: number) {
        return `payment method completed using credit card ${amount}`
    }
}

class paypal implements PaymentMethod {  // Low level module
    processPayment(amount: number) {
        return `payment method completed using paypal ${amount}`
    }
}

class Store1 { // High level module
    processPayment: PaymentMethod
    constructor(processPayment: PaymentMethod) {
        this.processPayment = processPayment;
    }
    makePayment(amount: number) {
        return this.processPayment.processPayment(amount)
    }
}

const creditCardMethod = new CreditCard1()
console.log(new Store1(creditCardMethod).makePayment(100))

const paypalMethod = new paypal()
console.log(new Store1(paypalMethod).makePayment(89))




