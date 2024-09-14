// Your code here
function createEmployeeRecord(array) {
    const employeeRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, date) {
    employeeRecord.timeInEvents.push({
        type:"TimeIn",
        hour: parseInt(date.substring(11,15), 10),
        date: date.substring(0, 10)
    });
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, date) {
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(date.substring(11, 15), 10),
        date: date.substring(0, 10)
    });
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    let hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, date) {
    let wageOwed = hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
    return wageOwed;
}

function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);

    let totalWages = datesWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);

    return totalWages;
}

function calculatePayroll(employeeRecords) {
    let payroll = employeeRecords.reduce((total, employeeRecord) => {
        return total + allWagesFor(employeeRecord);
    }, 0);

    return payroll;
}