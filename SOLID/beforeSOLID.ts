// Singleton design pattern for single class reference  (design pattern)
class GenrateId {
    private id: number = 1;
    private static instance: GenrateId = null

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
