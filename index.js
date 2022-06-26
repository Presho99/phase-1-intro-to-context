// Your code here
let createEmployeeRecord  = function(arr) {
    return{
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(mainArr) {
    return mainArr.map(function(arr){
        return createEmployeeRecord(arr)
    })
}

let createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}
let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type:"TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let hoursWorkedOnDate = function(employee, newDate) {
   let inTime = employee.timeInEvents.find(function(e){
       return e.date === newDate
   }) 

   let outTime = employee.timeOutEvents.find(function(e){
       return e.date === newDate
   })

   return (outTime.hour - inTime.hour) / 100 
}

let wagesEarnedOnDate = function(employee, newDate) {
    let wage = hoursWorkedOnDate(employee, newDate) * employee.payPerHour
    return parseFloat(wage.toString())

}

let allWagesFor = function(employee) {
    let workedDates = employee.timeInEvents.map(function(e){
        return e.date
    })
    let pay = workedDates.reduce(function(m, d){
        return m + wagesEarnedOnDate(employee, d)
    }, 0)
    return pay
}

let findEmployee = function(arr1, firstName) {
    return arr1.find(function(r){
        return r.firstName === firstName
    })
}

let calculatePayroll = function(recordArr) {
    return recordArr.reduce(function(m, r){
        return m + allWagesFor(r)
    }, 0)
}