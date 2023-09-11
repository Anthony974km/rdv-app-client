import React, { useState } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider} from "@mui/x-date-pickers";

const Home = () => {
    const [dateSelect, setDateSelect] = useState( "")
    return (
        <>
        <div>
            <h1>Lorem ipsum dolor sit amet</h1>
            <p>Excepteur sint occaecat cupidatat non proident, sunt inculpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>

        <DateCalendar  onChange={(newValue) => setDateSelect(newValue)} />
        </LocalizationProvider>
        </>
       
    );
};

export default Home;