
// abstract methods  ABSTRACTION
// interface Shape {
//     area(): number;
//     perimeter(): number;
// }

// class Circle implements Shape {
//     constructor(private radius: number) { }
//     area(): number {
//         return Math.PI * Math.pow(this.radius, 2)
//     }
//     perimeter(): number {
//         return 2 * Math.PI * this.radius;
//     }
// }

// class Rectangle implements Shape {
//     constructor(private height: number, private width: number) { }
//     area(): number {
//         return this.height * this.width
//     }
//     perimeter(): number {
//         return 2 * (this.height + this.width)
//     }
// }

// const calculateArea = (shape: Shape) => {
//     return shape.area()
// }


// // client code- they should consume above class

// let circle = new Circle(6)
// let rectangle = new Rectangle(5, 7)

// console.log(calculateArea(circle), 'area of circle')
// console.log(calculateArea(rectangle), 'area of rectangle')

// Time to practice - abstract methods 

// Date class
// Get current year
// get current month
// get current date

// date class abstraction 

// let date = new Date()

// console.log(date.getFullYear())

// console.log(date.getMonth() + 1)

// console.log(date.getDate())

//  ENCAPSULATION

interface bank {
    deposite(amount: number): number;
    withdraw(amount: number): number
}

class BankAccount implements bank {
    private _balance: number = 0

    constructor(initalAmount: number) {
        this._balance = initalAmount
    }

    get myBalance() {
        return this._balance
    }

    deposite(amount: number) {
        return this._balance += amount
    }

    withdraw(amount: number) {
        return this._balance -= amount
    }
}


const myAccount = new BankAccount(2000);

myAccount.deposite(500)

myAccount.withdraw(1000)

console.log(myAccount.myBalance)