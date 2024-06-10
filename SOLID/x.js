var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Singleton design pattern for single class reference  (design pattern)
var GenrateId = /** @class */ (function () {
    function GenrateId() {
        this.id = 1;
    }
    GenrateId.getInstance = function () {
        if (!this.instance) {
            this.instance = new GenrateId();
        }
        return this.instance;
    };
    GenrateId.prototype.getId = function () {
        return this.id++;
    };
    return GenrateId;
}());
// Single responsibility priciple - any class/function/module (unit-of-code) should have a single, well-defined responsibiity
var ZooEntity = /** @class */ (function () {
    function ZooEntity(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    ZooEntity.prototype.getDetails = function () {
        return 'name ' + this.name + 'age ' + this.age + 'gender ' + this.gender;
    };
    return ZooEntity;
}());
var Visitor = /** @class */ (function (_super) {
    __extends(Visitor, _super);
    function Visitor(name, age, gender, isVip) {
        var _this = _super.call(this, name, age, gender) || this;
        _this.isVip = isVip;
        _this.ticketId = GenrateId.getInstance().getId();
        _this.inTime = new Date();
        return _this;
    }
    Visitor.prototype.updateOutTime = function () {
        this.outTime = new Date();
    };
    Visitor.prototype.isAdult = function () {
        return this.age >= 18;
    };
    return Visitor;
}(ZooEntity));
var Staff = /** @class */ (function (_super) {
    __extends(Staff, _super);
    function Staff(name, age, gender, salary, department, maritalStatus) {
        var _this = _super.call(this, name, age, gender) || this;
        _this.staffId = "".concat(_this.name, " ").concat(GenrateId.getInstance().getId());
        _this.salary = salary;
        _this.department = department;
        _this.maritalStatus = maritalStatus;
        return _this;
    }
    Staff.prototype.staffSalary = function () {
        return this.salary;
    };
    Staff.prototype.staffDepartment = function () {
        return this.department;
    };
    Staff.prototype.married = function () {
        return this.maritalStatus;
    };
    return Staff;
}(ZooEntity));
var Animal = /** @class */ (function (_super) {
    __extends(Animal, _super);
    function Animal(name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal) {
        var _this = _super.call(this, name, age, gender) || this;
        _this.ate = ate;
        _this.species = species;
        _this.canFly = canFly;
        _this.isVegtarian = isVegtarian;
        _this.canBreathUnderWater = canBreathUnderWater;
        _this.playfullAnimal = playfullAnimal;
        _this.animalId = "".concat(_this.name, " ").concat(GenrateId.getInstance().getId());
        return _this;
    }
    Animal.prototype.eat = function () {
        return this.ate;
    };
    Animal.prototype.vegtarian = function () {
        return this.isVegtarian;
    };
    return Animal;
}(ZooEntity));
// open closed principle - your code should be closed for modification, but still, remain open to extension!
// before
var Bird = /** @class */ (function (_super) {
    __extends(Bird, _super);
    function Bird(name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal, beakLength, wingSpan) {
        var _this = _super.call(this, name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal) || this;
        _this.beakLength = beakLength;
        _this.wingSpan = wingSpan;
        return _this;
    }
    return Bird;
}(Animal));
// open closed principle
// after
var Pigeon = /** @class */ (function (_super) {
    __extends(Pigeon, _super);
    function Pigeon(name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal, beakLength, wingSpan) {
        return _super.call(this, name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal, beakLength, wingSpan) || this;
    }
    Pigeon.prototype.flyingType = function () {
        return 'flap wings, i can fly';
    };
    Pigeon.prototype.swim = function () {
        return 'no bro!';
    };
    return Pigeon;
}(Bird));
var Eagle = /** @class */ (function (_super) {
    __extends(Eagle, _super);
    function Eagle(name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal, beakLength, wingSpan) {
        return _super.call(this, name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal, beakLength, wingSpan) || this;
    }
    Eagle.prototype.flyingType = function () {
        return 'spread wings and glide elegantly';
    };
    Eagle.prototype.swim = function () {
        return 'no bro!';
    };
    return Eagle;
}(Bird));
// Liskov's Substitution Principle - Any object of a `class child extends Parent` should be able to replace any object of a `class parent` without any issues
// child classes should NOT violate expectations set by the parents
// before 
// In this example, Penguin inherits from Bird but cannot fly. Calling fly on a Penguin instance results in an error, breaking the substitution principle. A Penguin cannot be substituted for a Bird without altering the behavior of the program.
var Penguin = /** @class */ (function (_super) {
    __extends(Penguin, _super);
    function Penguin(name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal, beakLength, wingSpan) {
        return _super.call(this, name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal, beakLength, wingSpan) || this;
    }
    Penguin.prototype.flyingType = function () {
        return '!!!!!!!';
    };
    Penguin.prototype.swim = function () {
        return 'bro, i can swim ';
    };
    return Penguin;
}(Bird));
var Penguin1 = /** @class */ (function (_super) {
    __extends(Penguin1, _super);
    function Penguin1(name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal, beakLength, wingSpan) {
        return _super.call(this, name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal, beakLength, wingSpan) || this;
    }
    Penguin1.prototype.swim = function () {
        return 'bro, i can swim ';
    };
    return Penguin1;
}(Bird));
var Pigeon2 = /** @class */ (function (_super) {
    __extends(Pigeon2, _super);
    function Pigeon2(name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal, beakLength, wingSpan) {
        return _super.call(this, name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal, beakLength, wingSpan) || this;
    }
    Pigeon2.prototype.flyingType = function () {
        return 'flap wings, i can fly';
    };
    Pigeon2.prototype.spreadWings = function () {
        return true;
    };
    Pigeon2.prototype.flapWings = function () {
        return 'yes, faslty!';
    };
    return Pigeon2;
}(Bird));
var Eagle2 = /** @class */ (function (_super) {
    __extends(Eagle2, _super);
    function Eagle2(name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal, beakLength, wingSpan) {
        return _super.call(this, name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal, beakLength, wingSpan) || this;
    }
    Eagle2.prototype.flyingType = function () {
        return 'spread wings and glide elegantly';
    };
    Eagle2.prototype.spreadWings = function () {
        return true;
    };
    Eagle2.prototype.flapWings = function () {
        return 'yes,glide elegantly and flap faslty!';
    };
    return Eagle2;
}(Bird));
var superman = /** @class */ (function (_super) {
    __extends(superman, _super);
    function superman(name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal, beakLength, wingSpan) {
        return _super.call(this, name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal, beakLength, wingSpan) || this;
    }
    superman.prototype.flyingType = function () {
        return "combination of powers he derives from Earth's “yellow” Sun and from his extraterrestrial biology";
    };
    superman.prototype.superBreath = function () {
        return "Superman's breath was capable of freezing objects and generating hurricane-force winds.";
    };
    return superman;
}(Bird));
var Eagle3 = /** @class */ (function (_super) {
    __extends(Eagle3, _super);
    function Eagle3(name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal, beakLength, wingSpan) {
        return _super.call(this, name, age, gender, species, canFly, isVegtarian, ate, canBreathUnderWater, playfullAnimal, beakLength, wingSpan) || this;
    }
    Eagle3.prototype.flyingType = function () {
        return 'spread wings and glide elegantly';
    };
    Eagle3.prototype.spreadWings = function () {
        return true;
    };
    Eagle3.prototype.flapWings = function () {
        return 'yes,glide elegantly and flap faslty!';
    };
    return Eagle3;
}(Bird));
// Dependency Inversion Principle - any code (high/low level) should NEVER depend on low level implementation details
// payment method - simple example
// before
var CreditCard = /** @class */ (function () {
    function CreditCard() {
    }
    CreditCard.prototype.makePayment = function () {
        return 'payment method completed using credit card';
    };
    return CreditCard;
}());
var Store = /** @class */ (function () {
    function Store() {
        this.processPayment = new CreditCard();
    }
    Store.prototype.payBill = function () {
        console.log(this.processPayment.makePayment());
    };
    return Store;
}());
new Store().payBill();
var CreditCard1 = /** @class */ (function () {
    function CreditCard1() {
    }
    CreditCard1.prototype.processPayment = function (amount) {
        return "payment method completed using credit card ".concat(amount);
    };
    return CreditCard1;
}());
var paypal = /** @class */ (function () {
    function paypal() {
    }
    paypal.prototype.processPayment = function (amount) {
        return "payment method completed using paypal ".concat(amount);
    };
    return paypal;
}());
var Store1 = /** @class */ (function () {
    function Store1(processPayment) {
        this.processPayment = processPayment;
    }
    Store1.prototype.makePayment = function (amount) {
        return this.processPayment.processPayment(amount);
    };
    return Store1;
}());
var creditCardMethod = new CreditCard1();
console.log(new Store1(creditCardMethod).makePayment(100));
var paypalMethod = new paypal();
console.log(new Store1(paypalMethod).makePayment(89));
