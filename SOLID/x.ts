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


