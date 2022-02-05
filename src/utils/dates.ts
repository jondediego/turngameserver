export function isLowerOrEqualDay(date1: Date, date2: Date) {
    if (date1.getFullYear() < date2.getFullYear() ||
        (date1.getFullYear() == date2.getFullYear() && date1.getMonth() < date2.getMonth()) ||
        (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() <= date2.getDate())) {
        return true;
    }
    return false;
}

export function isGreaterOrEqualDay(date1: Date, date2: Date) {
    if (date1.getFullYear() > date2.getFullYear() ||
        (date1.getFullYear() == date2.getFullYear() && date1.getMonth() > date2.getMonth()) ||
        (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() >= date2.getDate())) {
        return true;
    }
    return false;
}
export function sameDay(date1: Date, date2: Date) {
    if (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate()) {
        return true;
    }
    return false;
}

export function cloneDate(date: Date) {
    return date != null ? new Date(date.getTime()) : date;
}

export function getLastDateInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0);
}

export function getFirstDateInMonth(year: number, month: number) {
    return new Date(year, month, 1);
}

export function getFirstMondayInMonth(year: number, month: number) {
    var dateAux = getFirstDateInMonth(year, month);
    while (dateAux.getDay() != 1) {
        dateAux.setDate(dateAux.getDate() - 1);
    }
    return dateAux;
}

export function diffInDays(date1: any, date2: any) {
    const diffTime = Math.abs(date2 - date1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export const isWeekend = (date: Date, isFridayWeekend: boolean) => {
    return date.getDay() == 6 || date.getDay() == 0 || (isFridayWeekend == true && date.getDay() ==5);
}
export const isWeekendByDayNumber = (dateDay: number, isFridayWeekend: boolean) => {
    return dateDay == 6 || dateDay == 0 || (isFridayWeekend == true && dateDay ==5);
}

export const formatDate =(date: Date):string =>{
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
}