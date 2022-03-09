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

    //loggedin user
    const [user, setUser] = useState({});

    useEffect(() => {
        //TODO make working days in backend to retrive name of the user
        axios.get("/api/admin/getWorkingDays")
            .then(res => setWorkingDays(res.data));
        console.log(date)

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