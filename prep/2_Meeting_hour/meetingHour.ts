type Meeting = {
  title: string;
  hours: number;
};

const optimizeMeetingsAttended = (meetings: Meeting[], hoursInDay: number) => {
  let remainingHoursOfDay = hoursInDay;
  const meetingsToAttend = [];

  meetings.sort((a, b) => a.hours - b.hours);

  for (let meeting of meetings) {
    remainingHoursOfDay -= meeting.hours;

    if (remainingHoursOfDay < 0) {
      break;
    }
    meetingsToAttend.push(meeting);
  }
  return meetingsToAttend;
};

const meetings = [];

console.log(
  optimizeMeetingsAttended(
    [
      { title: "foo", hours: 5 },
      { title: "foo", hours: 2 },
      { title: "foo", hours: 3 },
      { title: "foo", hours: 1 },
    ],
    6
  )
);

const generateBinaryNumberArray = (n: number, arrayLength: number) => {
  let binaryStr = n.toString(2);
  binaryStr = binaryStr.padStart(arrayLength, "0");
  const binaryArray = binaryStr.split("");
  binaryArray.map((n) => parseInt(n, 10));
  return binaryArray;
};

const optimizeMeetingHours = (meetings: number[], hoursInDay: number) => {
  let bestSchedule = [];
  let bestHours = 0;

  
  for (let i = 0; i < meetings.length; i++) {
    for (let j = i + 1; j < meetings.length + 1; j++) {
      const;
    }
  }
};
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
