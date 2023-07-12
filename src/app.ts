console.log("testing test")

// Can create an 'abstract class' by simply adding the key word abstract before the
//delaraction of a new class. These classes can't be instantiated directly, and are
//used for solely for inheritance

class Department {
    //properties by default public access
    public name: string;

    //read-only properties cannot be changed after initialization
    public readonly location: string;


    //by turning employees into a private property we make it only accessible from
    //inside the class/object and can't call object.employees outside the class
    private employees: string[] = [];

    //shorthand initialization, adding id to the object without predifining it above
    constructor(n: string, public id: number, location: string) {
        this.name = n;
        this.location = location;
    }
    //method

    //creating a static method that we can use without creating an instance of the class
    static createEmployee(name:string){
        return {name: name}
    }


    //setting this: Department, makes it so this method can only be called on an instance of the class
    describe(this: Department) {
        console.log('Department: ' + this.name)
    }

    addEmployee(employee: string){
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

//calling our static method
const newEmployee = Department.createEmployee('Dylan');
console.log(newEmployee);



const accounting = new Department('Accounting', 1, 'Atlanta');

console.log(accounting);

accounting.addEmployee('Dylan');
accounting.addEmployee('Christian');

accounting.printEmployeeInformation();

// Inheritance
//automatically recieves all properties and methods from parent even the constuctor

//Often you will overright the constructor
class ITDepartment extends Department {
    constructor(id:number, public admins: string[]){
        super('IT', id, 'Atlanta'); //calls the constructor of the base class
    }
}

const IT = new ITDepartment(2, ['Rhiannon']);

console.log(IT)
IT.describe()

//Private properties are not inherited! So any class that inherits from a parent
//cannot adjust that parents private classes

//If you want properties from the parent to be accessible to the child, but still
//not accessible outside of the class you can use protected!

class Accounting extends Department {
    private lastReport: string;


    // getters are used to display private properties outside of the class
    //they must return something  (or throw an error)
    get mostRecentReport() {
        if (this.lastReport){
            return this.lastReport;
        }
        throw new Error('No report found.')
    }

    //setters allow you to modify private properties
    set mostRecentReport(value: string){
        this.lastReport = value
    }

    constructor(id: number, private reports: string[]){
        super('Accounting', id, 'Atlanta');
        this.lastReport = reports[reports.length - 1]
    }

    addReport(text: string){
        this.reports.push(text)
        this.lastReport = text
    }

    printReport() {
        for (let report of this.reports){
            console.log(report)
        }
    }
}

const newAccounting = new Accounting(3, ['Doing Great', 'We rock!'])

newAccounting.printReport()
//by using the equals operator we activate our setter
newAccounting.mostRecentReport = 'Year End Report'
//without the eauals sign we summon the getter
console.log(newAccounting.mostRecentReport)