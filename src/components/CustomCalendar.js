import React from "react";
import Calendar from "react-calendar";
import { useState } from "react";
import "../styles/components/calendar.css";

// react calendar link documentation
// https://github.com/wojtekmaj/react-calendar/blob/main/packages/react-calendar/README.md

export default function CustomCalendar() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar-container">
      <div className="calendar-divider"></div>

      <Calendar
        onChange={setDate}
        value={date}
        locale="fr-FR"
        nextLabel={
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 13L7 7L1 1"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        }
        prevLabel={
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 13L1 7L7 1"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        }
      />
      {/*  i you want to add selectRange Date to the calendar */}
      {/* <Calendar onChange={setDate} value={date} selectRange={true} /> */}
    </div>
  );
}
