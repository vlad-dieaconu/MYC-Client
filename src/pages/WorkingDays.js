import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";

import React, {useEffect, useState} from "react";
import NavbarAdmin from "../components/NavbarAdmin";
import axios from "axios";
import {useNavigate} from "react-router-dom";

import WorkingDaysAccordion from "../components/WorkingDaysAccordion";

import {SingleDatePicker} from 'react-dates';
import {Button, Container} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles((theme) => {
        return {
            page: {
                width: '100%',
                height: '100%'
            },
        };
    }
)


const WorkingDays = () => {

    const classes = useStyles();
    const navigate = useNavigate();
    /**Data from backend**/
    const [workingDays, setWorkingDays] = useState([]);
    /***Date picker*/
    const [date, setDate] = useState(null);
    const [focus, setFocus] = useState(false);


    const [employeeId, setEmployeeId] = useState("");
    const [employee, setEmployee] = useState([]);

    //loggedin user
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get("/api/admin/getWorkingDays")
            .then(res => setWorkingDays(res.data));
        console.log(date)
        axios.get("/api/admin/getEmployees")
            .then(res => setEmployee(res.data));
        const loggedInUser = localStorage.getItem("USER");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        } else {
            navigate("/home");
        }

    }, [date])

    /**function for sending date parameter**/
    const getWorkingDaysByDate = () => {

        axios.post("/api/admin/getWorkingDayByDate",{date: date.format("YYYY-MM-DD")
        }).then(res => setWorkingDays(res.data));
    }

    const handleChangeSelect = async (event) => {
        event.preventDefault();
        axios.get("/api/admin/getWorkingDaysForOneEmployee?id=" + event.target.value).then(res => setWorkingDays(res.data))
    }

    return (
        <div>
            <NavbarAdmin></NavbarAdmin>

                <div className={classes.page}>
                    <div style={{position: 'absolute', top: '100px', left: '60px', width: '100%'}}>
                    <h4>
                        Select information only for a specific date
                    </h4>

                    <SingleDatePicker
                        date={date}
                        onDateChange={(date) => setDate(date)}
                        focused={focus} // PropTypes.bool
                        onFocusChange={({focused}) => setFocus(focused)}
                        numberOfMonths={1}
                        displayFormat="DD-MM-YYYY"
                        showClearDate={true}
                        isOutsideRange={() => false}
                    />
                        <div>
                            <Button onClick={getWorkingDaysByDate}>Search</Button>
                        </div>

                        <div>
                            <h4>Search by a specific employee</h4>
                            <FormControl style={{marginTop: "10px", width: '10%'}}>
                                <InputLabel id="demo-simple-select-label">Employee</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={employeeId}
                                    label="Employee"
                                    onChange={handleChangeSelect}
                                >
                                    {employee.map((empl, index) => {
                                        if(index !== 0)
                                        return(
                                            <MenuItem value={empl.id}>{empl.nume + " " + empl.prenume}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>


                <div style={{position: "absolute", top: '100px', right: '100px', width: '900px'}}>
                    {workingDays.map((wkDay) => (
                        <WorkingDaysAccordion workingDay={wkDay}/>
                    ))}
                </div>

        </div>
    )

}
export default WorkingDays;
