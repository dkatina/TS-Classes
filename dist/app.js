"use strict";
console.log("testing test");
class Department {
    constructor(n, id, location) {
        this.id = id;
        this.employees = [];
        this.name = n;
        this.location = location;
    }
    static createEmployee(name) {
        return { name: name };
    }
    describe() {
        console.log('Department: ' + this.name);
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
const newEmployee = Department.createEmployee('Dylan');
console.log(newEmployee);
const accounting = new Department('Accounting', 1, 'Atlanta');
console.log(accounting);
accounting.addEmployee('Dylan');
accounting.addEmployee('Christian');
accounting.printEmployeeInformation();
class ITDepartment extends Department {
    constructor(id, admins) {
        super('IT', id, 'Atlanta');
        this.admins = admins;
    }
}
const IT = new ITDepartment(2, ['Rhiannon']);
console.log(IT);
IT.describe();
class Accounting extends Department {
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found.');
    }
    set mostRecentReport(value) {
        this.lastReport = value;
    }
    constructor(id, reports) {
        super('Accounting', id, 'Atlanta');
        this.reports = reports;
        this.lastReport = reports[reports.length - 1];
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReport() {
        for (let report of this.reports) {
            console.log(report);
        }
    }
}
const newAccounting = new Accounting(3, ['Doing Great', 'We rock!']);
newAccounting.printReport();
newAccounting.mostRecentReport = 'Year End Report';
console.log(newAccounting.mostRecentReport);
