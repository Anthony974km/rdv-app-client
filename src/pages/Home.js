import React, { useState } from "react";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers";
import "../styles/pages/Home.css";
import CustomCalendar from "../components/CustomCalendar";
const Home = () => {
  const [dateSelect, setDateSelect] = useState("");

  return (
    <div className="main-container">
      <div className="container">
        <div className="header-text">
          <h1>Lorem ipsum dolor sit amet</h1>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt inculpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateCalendar className="calendar" onChange={(newValue) => setDateSelect(newValue)} />
        </LocalizationProvider> */}
        <CustomCalendar />
      </div>
    </div>
  );
};
export default Home;
