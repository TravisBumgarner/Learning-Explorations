// enum DaysOfTheWeek {
//     SUN, MON, TUE, WED, THU, FRI, SAT
// }

// let day: DaysOfTheWeek;

// day = DaysOfTheWeek.MON;


function echo<T extends number | string>(arg: T, blarg: T): T {
    return arg
}

const foo = echo(5, 5)