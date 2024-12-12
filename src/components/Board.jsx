import React, { useState } from "react";

export default function Board() {
  const [selectedYear, setSelectedYear] = useState(2000);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const dates = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const getLastDays = (year, month) => {
    let totalDays = 0;

    for (let y = 2000; y < year; y++) {
      totalDays += isLeapYear(y) ? 366 : 365;
    }

    for (let m = 0; m < month - 1; m++) {
      totalDays += months[m];
    }

    if (isLeapYear(year) && month > 2) totalDays += 1;

    return totalDays;
  };

  const totalDays = getLastDays(selectedYear, selectedMonth);

  const startDate = (totalDays + 6) % 7;

  let days = [];
  for (let d = 1; d <= months[selectedMonth - 1]; d++) {
    days.push(d);
  }
  days = [...Array(startDate).fill(null), ...days]

  const yearArr = [];
  const monthArr = [];
  for (let month = 1; month <= 12; month++) monthArr.push(month);
  for (let year = 2000; year <= 2050; year++) yearArr.push(year);

  console.log(days);

  return (
    <div className="board">
      <header>
        <label htmlFor="year-select">Year :  </label>
        <select
          name=""
          id="year-select"
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {yearArr.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <label htmlFor="month-select">Month :  </label>
        <select
          name=""
          id="month-select"
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        >
          {monthArr.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </header>
      <div className="body">
        {dates.map((date) => (
          <div key={date}>
            <b>{date}</b>
          </div>
        ))}
        {days.map((day, index) => (
          <div key={index}>
            <p>{day}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
