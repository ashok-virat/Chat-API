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

// before

// class ZooEntity {
//     // staff
//     staffName: string;
//     loggedInTime: Date;
//     idNumber: number
//     staffAge: number
//     staffGender: string

//     // visitors
//     visitorName: string
//     inTime: Date
//     outTime: Date
//     ticketId: number;
//     visitorAge: number
//     visitorGender: string

//     //animals
//     animalName: string
//     species: string
//     canFly: boolean
//     isVegtarian: boolean
//     animalAge: number
//     animalGender: string

//     constructor() {
//         // staff
//         // this.staffName = '';
//         // this.loggedInTime = new Date();
//         // this.idNumber = 0
//         // this.staffAge = 0;
//         // this.staffGender = ''

//         // // visitor
//         // this.visitorName = '';
//         // this.inTime = 0;
//         // this.outTime = 0;
//         // this.visitorAge = 0;
//         // this.visitorGender = '';
//         // this.ticket = 0;

//         // //animal
//         // this.animalName = '';
//         // this.animalAge = 0;
//         // this.animalGender = '';
//         // this.species = '';
//         // this.canFly = false;
//         // this.isVegtarian = false
//     }
//     addAnimal(animalName: string, animalAge: number, animalGender: string, species: string, canFly: boolean, isVegtarian: boolean) {
//         this.animalName = animalName;
//         this.animalAge = animalAge;
//         this.animalGender = animalGender;
//         this.species = species;
//         this.canFly = canFly;
//         this.isVegtarian = isVegtarian
//     }

//     addVisitors(visitorName: string, ticketId: number, visitorAge: number, visitorGender: string) {
//         this.visitorName = visitorName;
//         this.inTime = new Date();
//         this.ticketId = GenrateId.getInstance().getId()
//         this.visitorAge = visitorAge
//         this.visitorGender = visitorGender
//     }

//     addStaff(staffName: string, staffAge: number, staffGender: string) {
//         this.staffAge = staffAge
//         this.staffName = staffName
//         this.staffGender = staffGender
//         this.idNumber = GenrateId.getInstance().getId()
//     }

//     isThiscanFly() {
//         return this.canFly
//     }

//     getVisitorId() {
//         return `${this.visitorName} ${this.ticketId}`
//     }
// }


// let newAnimal = new ZooEntity();
// newAnimal.addAnimal('lion', 12, 'male', 'leo', true, false)

// let newStaff = new ZooEntity();
// newStaff.addStaff('Arun', 26, 'male')
// console.log(newStaff)

// let newStaff2 = new ZooEntity();
// newStaff2.addStaff('Vijay', 26, 'male')
// console.log(newStaff2)

// let newStaff3 = new ZooEntity();
// newStaff3.addStaff('virat', 26, 'male')
// console.log(newStaff3)

// let newStaff4 = new ZooEntity();
// newStaff4.addStaff('dhoni', 26, 'male')
// console.log(newStaff4)

// let newVisitor = new ZooEntity();
// newVisitor.addVisitors('Ashok', 1, 26, 'male')

// console.log(newVisitor.getVisitorId())


// after - using SRP
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
    processPayment(amount: number): string
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




//summary of each principle

// 1. Single Responsibility Principle (SRP)
// Definition: A class should have only one reason to change, meaning it should only have one job or responsibility.

// Benefit: Makes the system easier to maintain and understand.

// Example:

// Before: A ZooEntity class handling details of staff, visitors, and animals.
// After: Separate classes (Staff, Visitor, Animal) for each responsibility.
// 2. Open/Closed Principle (OCP)
// Definition: Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification.

// Benefit: Enhances code flexibility and minimizes the risk of introducing bugs when extending functionality.

// Example:

// Before: A Bird class with multiple if conditions to handle different species' flying and swimming behaviors.
// After: Separate classes (Pigeon, Eagle, Penguin) extending Bird and overriding methods as needed.
// 3. Liskov Substitution Principle (LSP)
// Definition: Subtypes must be substitutable for their base types without altering the correctness of the program.

// Benefit: Ensures that derived classes can be used interchangeably with their base classes, promoting reliable code reuse.

// Example:

// Using interfaces such as Flyable and Swimmable to ensure that subclasses like Penguin don't force behaviors that don't apply to them (e.g., flying).
// 4. Interface Segregation Principle (ISP)
// Definition: No client should be forced to depend on methods it does not use. Prefer small, specific interfaces over large, general-purpose ones.

// Benefit: Promotes cleaner, more modular code by ensuring that classes only implement interfaces relevant to them.

// Example:

// Creating small interfaces like Flyable and Swimmable instead of a single large interface for all animal behaviors.
// 5. Dependency Inversion Principle (DIP)
// Definition: High-level modules should not depend on low-level modules. Both should depend on abstractions (e.g., interfaces). Abstractions should not depend on details. Details should depend on abstractions.

// Benefit: Decouples high-level and low-level modules, making the system more flexible and easier to maintain.

// Example:

// Before: A Store class directly instantiates a CreditCard class for payments.
// After: The Store class depends on an PaymentMethod interface, allowing different payment methods (CreditCard, PayPal) to be used interchangeably.
// Summary
// By adhering to the SOLID principles:

// SRP: Your classes have single, well-defined responsibilities.
// OCP: Your system can be extended with new features without modifying existing code.
// LSP: Your subclasses are interchangeable with their base classes.
// ISP: Your interfaces are small and specific, leading to cleaner and more modular code.
// DIP: Your high-level modules depend on abstractions rather than concrete implementations, promoting flexibility and reducing coupling.
// These principles collectively lead to more maintainable, flexible, and robust software design. Well done on mastering them!




