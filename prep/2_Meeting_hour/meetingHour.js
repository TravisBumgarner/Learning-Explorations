var optimizeMeetingsAttended = function (meetings, hoursInDay) {
    var remainingHoursOfDay = hoursInDay;
    var meetingsToAttend = [];
    meetings.sort(function (a, b) { return a.hours - b.hours; });
    for (var _i = 0, meetings_1 = meetings; _i < meetings_1.length; _i++) {
        var meeting = meetings_1[_i];
        remainingHoursOfDay -= meeting.hours;
        if (remainingHoursOfDay < 0) {
            break;
        }
        meetingsToAttend.push(meeting);
    }
    return meetingsToAttend;
};
var meetings = [];
console.log(optimizeMeetingsAttended([
    { title: "foo", hours: 5 },
    { title: "foo", hours: 2 },
    { title: "foo", hours: 3 },
    { title: "foo", hours: 1 },
], 6));
var generateBinaryNumberArray = function (n, arrayLength) {
    var binaryStr = n.toString(2);
    binaryStr = binaryStr.padStart(arrayLength, "0");
    var binaryArray = binaryStr.split("");
    binaryArray.map(function (n) { return parseInt(n, 10); });
    return binaryArray;
};
for (var i = 0; i < 6; i++) {
    console.log(generateBinaryNumberArray(i, 4));
}
// const optimizeMeetingHours = (meetings: number[], hoursInDay: number) => {
//   let bestSchedule = [];
//   let bestHours = 0;
//   for (let i = 0; i < meetings.length; i++) {
//     for (let j = i + 1; j < meetings.length + 1; j++) {
//       const;
//     }
//   }
// };
// optimizeMeetingHours([1, 2, 3], 2);
/*
8 Hours

1 3 2 5 -> 5, 3 || 1,2,5

Goal -> Find a combination of meetings that equals 8, or take the max.

Worst Case:

[1, 2, 3]

[]

2 2 2 2 7

Dictionary

Notes: Meetings cannot be longer than 8 hours
Meetings: Are they full hours ints?
*/
