import React, {useEffect, useState} from 'react'

import NavbarEmployee from "../components/NavbarEmployee";
import axios from "axios";
import {
    Button, Container,
    TextField
} from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import {SingleDatePicker} from "react-dates";
import {useNavigate} from "react-router-dom";

import WorkingDaysCard from "../components/WorkingDaysCard";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";



const WorkingDayEmployee = () => {

    const navigate = useNavigate();

    const [details, setDetails] = useState("");
    const [date, setDate] = useState(null);
    const [personalWorkingDays, setPersonalWorkingDays] = useState({});
    const [onePersonalWorkingDay, setOnePersonalWorkingDay] = useState({});

    const [focus, setFocus] = useState(false);
    const [selected, setSelected] = useState(false);

    const [user, setUser] = useState({});
    const [dataIsSet, setData] = useState(false);


    useEffect(() => {

        axios.get("/api/user/getPersonalWorkingDaysDetails")
            .then((res) => {
                setPersonalWorkingDays(res.data)
                setData(true);
            });

        const loggedInUser = localStorage.getItem("USER");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        } else {
            navigate("/home");
        }
    }, [])


    const handleSubmit = (e) => {

        axios.post("/api/user/addWorkingDayDetails", {
            details: details,
            date: date.format("YYYY-MM-DD")
        }).then(response => {
            console.log(response)
        })

    }

    const handleChangeDetails = (event) => {
        setDetails(event.target.value);
    }


    const handleChangeSelect = (event) => {
        console.log(personalWorkingDays);
        setSelected(true);
        setOnePersonalWorkingDay(personalWorkingDays[event.target.value - 1]);
    }

    //console.log(personalWorkingDays)

    return (
        <div>
            <NavbarEmployee/>
            {dataIsSet ?
                <div>

                    <FormControl fullWidth
                                 style={{marginTop: "60px"}}>
                        <InputLabel id="demo-simple-select-label">WorkingDay</InputLabel>
                        <Select

                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="WorkingDay"
                            onChange={handleChangeSelect}
                        >
                            {personalWorkingDays.map((persWkDay) => {
                                return (
                                    <MenuItem key={persWkDay.id} value={persWkDay.id}>{persWkDay.date.split("T")[0]}</MenuItem>
                                )
                            })}

                        </Select>
                    </FormControl>
                    { selected ? <WorkingDaysCard personalWorkingDay={onePersonalWorkingDay} selected={selected} /> : <></>}
                </div> : <></>}




            <Container>
                <h1> Set your details </h1>
                <div>
                    <SingleDatePicker
                        style={{marginBottom:"20px"}}
                        date={date} // momentPropTypes.momentObj or null
                        onDateChange={(date) => setDate(date)} // PropTypes.func.isRequired
                        focused={focus} // PropTypes.bool
                        onFocusChange={({focused}) => setFocus(focused)} // PropTypes.func.isRequired
                        numberOfMonths={1}
                        displayFormat="DD-MM-YYYY"
                        showClearDate={true}
                        maxDate={moment().toDate()}
                        isOutsideRange={() => false}
                    />
                </div>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>

                <TextField onChange={handleChangeDetails}
                           label="Details"
                           variant="outlined"
                           color="secondary"
                           multiline
                           rows={4}
                           fullWidth
                           required
                    // error={detailsError}
                />

                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    endIcon={<KeyboardArrowRightIcon/>}>
                    Submit
                </Button>
            </form> </Container>


        </div>
    )
}
export default WorkingDayEmployee;