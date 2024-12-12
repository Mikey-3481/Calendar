import React, { useState } from "react";

export default function Board() {
  const [selectedYear, setSelectedYear] = useState(2000);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const Dates = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let lastDays = 0;

  const yearArr = [];
  const monthArr = [];
  for (let month = 1; month <= 12; month++) monthArr.push(month);
  for (let year = 2000; year <= 2050; year++) yearArr.push(year);

  console.log(selectedMonth, selectedYear);

  return (
    <div className="board">
      <header>
        <label htmlFor="year-select">Year :</label>
        <select name="" id="year-select"
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {yearArr.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <label htmlFor="month-select">Month :</label>
        <select name="" id="month-select"
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        >
          {monthArr.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </header>
      <body>
        {Dates.map((date) => (
          <date key={date}>
            <b>{date}</b>
          </date>
        ))}
      </body>
    </div>
  );
}
