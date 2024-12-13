import React, { useMemo, useState } from "react";
import isLeapYear from "../utils/helper.js";
import {
  WEEK_DAYS,
  MONTHS,
  STARTING_YEAR,
  STARTING_MONTH,
  STARTING_WEEKDAY,
  DAYS_IN_LEAPYEAR,
  DAYS_IN_GENERALYEAR,
  DAYS_IN_WEEK,
  ENDING_YEAR,
} from "../constants.js";

const getTotalDays = (year, month) => {
  let totalDays = 0;
  for (let y = STARTING_YEAR; y < year; y++) {
    totalDays += isLeapYear(y) ? DAYS_IN_LEAPYEAR : DAYS_IN_GENERALYEAR;
  }
  for (let m = 0; m < month - 1; m++) {
    totalDays += MONTHS[m];
  }
  if (isLeapYear(year) && month > 2) totalDays += 1;
  return totalDays;
};

export default function Board() {
  const [selectedYear, setSelectedYear] = useState(STARTING_YEAR);
  const [selectedMonth, setSelectedMonth] = useState(STARTING_MONTH);

  const yearList = [];
  const monthList = [];
  for (let month = 1; month <= 12; month++) monthList.push(month);
  for (let year = STARTING_YEAR; year <= ENDING_YEAR; year++)
    yearList.push(year);

  const totalDays = getTotalDays(selectedYear, selectedMonth);
  const startDate = (totalDays + STARTING_WEEKDAY) % DAYS_IN_WEEK;

  const days = useMemo(() => {
    let daysOfMonth = [];
    for (let d = 1; d <= MONTHS[selectedMonth - 1]; d++) {
      daysOfMonth.push(d);
    }
    daysOfMonth = [...Array(startDate).fill(null), ...daysOfMonth];
    return daysOfMonth;
  }, [selectedYear, selectedMonth])

  return (
    <div className="board">
      <header>
        <label htmlFor="year-select">Year : </label>
        <select
          name=""
          id="year-select"
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {yearList.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <label htmlFor="month-select">Month : </label>
        <select
          name=""
          id="month-select"
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        >
          {monthList.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </header>
      <div className="body">
        {WEEK_DAYS.map((date) => (
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
