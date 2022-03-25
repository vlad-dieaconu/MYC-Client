import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";

import React, {useEffect, useState} from "react";
import NavbarAdmin from "../components/NavbarAdmin";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Container} from "@material-ui/core";
import WorkingDaysAccordion from "../components/WorkingDaysAccordion";
import {makeStyles} from "@material-ui/core/styles";
import {SingleDatePicker} from 'react-dates';
import {Button} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";


const useStyles = makeStyles((theme) => {
        return {
            page: {
                width: '100%',
                height: '100%',
                padding: theme.spacing(3),
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
        //TODO make working days in backend to retrive name of the user
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

    const handleChangeSelect = (event) => {
        setEmployeeId(event.target.value);
        axios.get("/api/admin/getWorkingDaysForOneEmployee?id="+employeeId).then(res => setWorkingDays(res.data))
    }

    return (
        <div>
            <NavbarAdmin></NavbarAdmin>
            <Container>
                <div className={classes.page}>
                    <h4>
                        Select information only for a specific date
                    </h4>

                    <SingleDatePicker
                        date={date} // momentPropTypes.momentObj or null
                        onDateChange={(date) => setDate(date)} // PropTypes.func.isRequired
                        focused={focus} // PropTypes.bool
                        onFocusChange={({focused}) => setFocus(focused)} // PropTypes.func.isRequired
                        numberOfMonths={1}
                        displayFormat="DD-MM-YYYY"
                        showClearDate={true}
                        isOutsideRange={() => false}
                    />
                    <Button onClick={getWorkingDaysByDate}>Search</Button>
                    <h4>Search by a specific employee</h4>
                    <FormControl fullWidth style={{marginTop: "10px"}}>
                        <InputLabel id="demo-simple-select-label">Employee</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={employeeId}
                            label="Employee"
                            onChange={handleChangeSelect}
                        >
                            {employee.map((empl) => {
                                return(
                                    <MenuItem value={empl.id}>{empl.nume + " " + empl.prenume}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>

                </div>
            </Container>
            <Container>
                <div className={classes.page}>
                    {workingDays.map((wkDay) => (
                        <WorkingDaysAccordion workingDay={wkDay}/>
                    ))}
                </div>

            </Container>

        </div>
    )

}
export default WorkingDays;