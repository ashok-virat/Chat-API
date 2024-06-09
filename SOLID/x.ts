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


<------------------------------------------------------------------------------------------------------------------->


    // Single responsibility priciple - any class/function/module (unit-of-code) should have a single, well-defined responsibiity
    //before
    class ZooEntity {
        // staff
        staffName: string;
        loggedInTime: Date;
        idNumber: number
        staffAge: number
        staffGender: string

        // visitors
        visitorName: string
        inTime: Date
        outTime: Date
        ticketId: number;
        visitorAge: number
        visitorGender: string

        //animals
        animalName: string
        species: string
        canFly: boolean
        isVegtarian: boolean
        animalAge: number
        animalGender: string

        constructor() {
            // staff
            // this.staffName = '';
            // this.loggedInTime = new Date();
            // this.idNumber = 0
            // this.staffAge = 0;
            // this.staffGender = ''

            // // visitor
            // this.visitorName = '';
            // this.inTime = 0;
            // this.outTime = 0;
            // this.visitorAge = 0;
            // this.visitorGender = '';
            // this.ticket = 0;

            // //animal
            // this.animalName = '';
            // this.animalAge = 0;
            // this.animalGender = '';
            // this.species = '';
            // this.canFly = false;
            // this.isVegtarian = false
        }
        addAnimal(animalName: string, animalAge: number, animalGender: string, species: string, canFly: boolean, isVegtarian: boolean) {
            this.animalName = animalName;
            this.animalAge = animalAge;
            this.animalGender = animalGender;
            this.species = species;
            this.canFly = canFly;
            this.isVegtarian = isVegtarian
        }

        addVisitors(visitorName: string, ticketId: number, visitorAge: number, visitorGender: string) {
            this.visitorName = visitorName;
            this.inTime = new Date();
            this.ticketId = GenrateId.getInstance().getId()
            this.visitorAge = visitorAge
            this.visitorGender = visitorGender
        }

        addStaff(staffName: string, staffAge: number, staffGender: string) {
            this.staffAge = staffAge
            this.staffName = staffName
            this.staffGender = staffGender
            this.idNumber = GenrateId.getInstance().getId()
        }

        isThiscanFly() {
            return this.canFly
        }

        getVisitorId() {
            return `${this.visitorName} ${this.ticketId}`
        }
    }


let newAnimal = new ZooEntity();
newAnimal.addAnimal('lion', 12, 'male', 'leo', true, false)

let newStaff = new ZooEntity();
newStaff.addStaff('Arun', 26, 'male')
console.log(newStaff)

let newStaff2 = new ZooEntity();
newStaff2.addStaff('Vijay', 26, 'male')
console.log(newStaff2)

let newStaff3 = new ZooEntity();
newStaff3.addStaff('virat', 26, 'male')
console.log(newStaff3)

let newStaff4 = new ZooEntity();
newStaff4.addStaff('dhoni', 26, 'male')
console.log(newStaff4)

let newVisitor = new ZooEntity();
newVisitor.addVisitors('Ashok', 1, 26, 'male')

console.log(newVisitor.getVisitorId())

// Single responsibility priciple 
//after
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

<------------------------------------------------------------------------------------------------------------------->


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
    fly() {
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
    fly() {
        return 'spread wings and glide elegantly'
    }
    swim() {
        return 'no bro!'
    }
}

class Penguin extends Bird {
    constructor(name: string, age: number, gender: string, species: string, canFly: boolean, isVegtarian: boolean, ate: boolean, canBreathUnderWater: boolean, playfullAnimal: boolean, beakLength: number, wingSpan: number) {
        super(name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal, beakLength, wingSpan)
    }
    fly() {
        return 'spread wings and glide elegantly'
    }
    swim() {
        return 'bro, i can swim '
    }
}

let newAnimal = new Eagle('ak vk', 12, 'male', 'penguin', true, false, false, false, false, 12, 50);
console.log(newAnimal.fly())
console.log(newAnimal.swim())


