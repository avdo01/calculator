const today = new Date();
const currentYear = today.getFullYear();

const addYears = (number) => {
    let yearsTemp = [];
    yearsTemp.push(currentYear);
    for (var i = 0; i < 41; i++) {
        yearsTemp.push(number + 1);
        number++;
    }

    return yearsTemp;
}

export const getNumberOfTableRows = (loanAmount, monthlyPayment, totalInterestVar) => {
    var counter = 0;
    var numberOfRows = 0;
    while (counter < loanAmount) {
        counter += monthlyPayment;
        numberOfRows += 1;
    }

    console.log(counter);
    return numberOfRows;
}

export const daysInYear =
    [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const monthsInYear =
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const nameOfMonths =
    ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const nameOfMonthsShortcut =
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const years = addYears(currentYear);

export const getMonthIndex = (name) => {
    for (var i = 0; i < nameOfMonths; i++) {
        if (nameOfMonths[i] === name) {
            return i;
        }
    }
}
