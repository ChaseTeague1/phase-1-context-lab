/* Your Code Here */
function createEmployeeRecord(employee){
    return {
        firstName : employee[0],
        familyName : employee[1],
        title : employee[2],
        payPerHour : employee[3],
        timeInEvents : [],
        timeOutEvents : []
    }
}

function createEmployeeRecords(records){
    return records.map(data => createEmployeeRecord(data));
}

function createTimeInEvent(dateStamp){
    let [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour),
        date
    })
    return this
}

function createTimeOutEvent(dateStamp){
    let [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour), 
        date
    })
    return this
}

function hoursWorkedOnDate(date){
    let inTime = this.timeInEvents.find(e => e.date === date)
    let outTime = this.timeOutEvents.find(e => e.date === date)
    return (outTime.hour - inTime.hour) / 100
}

function wagesEarnedOnDate(dateForm){
    let pay = hoursWorkedOnDate.call(this, dateForm) * this.payPerHour
    return pay
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(record => record.firstName === firstName)
}

function calculatePayroll(records){
    return records.reduce((accum, init) => accum + allWagesFor.call(init), 0)
}