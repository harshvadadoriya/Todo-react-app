// Date Component to dispplay live date
import React from "react";

const storeDate: number = new Date().getDate();
const storeYear: number = new Date().getFullYear();
const month: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const myMonth: Date = new Date();
const storeMonth: string = month[myMonth.getMonth()];

const day: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const myDay: Date = new Date();
const storeDay: string = day[myDay.getDay()];

const DateComponent: React.FC = (): JSX.Element => {
  return (
    <>
      <div className="row date-container">
        <div className="col date-month-year">
          <span className="date">{storeDate}</span>
          <span className="month-year">
            <span className="month">{storeMonth}</span>
            <p className="year">{storeYear}</p>
          </span>
        </div>
        <div className="col">
          <span className="day">{storeDay}</span>
        </div>
      </div>
    </>
  );
};

export default DateComponent;
