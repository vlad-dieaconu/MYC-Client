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
                <div
                    style={{
                            width: '300px',
                            marginTop: '100px',
                            marginRight: '40px',
                            marginLeft: '30px',
                            fontWeight: 'bold',
                            fontSize: '15px',
                    }}
                    >
                    Select a specific date for working day details:

                        < FormControl fullWidth
                        style={{marginTop: "20px"}}>
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
                    {selected ? <WorkingDaysCard personalWorkingDay={onePersonalWorkingDay} selected={selected} /> : <></>}
                        </div> : <></>}


                <Container>
                    <div
                        style={{
                            position: 'absolute',
                            top: '35%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '50%',
                        }}
                    >
                    <h1
                        style={{
                            marginBottom: '20px',
                        }}
                    > Set your details </h1>
                    <div
                        style={{
                            width: '100%',
                            marginBottom: '20px',
                            fontWeight: "bold",
                        }}
                    >
                        On date:
                        <div>
                        <SingleDatePicker
                            style={{marginBottom: "20px", marginLeft: '10px'}}
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
                    </div>
                    <div
                        style={{
                            marginTop: '30px',
                            right: '53%',
                        }}
                    >
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}
                        style={{
                            padding: '0px'
                        }}
                    >

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
                            style={{
                                marginTop: '20px',
                                right: '42%',
                            }}
                            type="submit"
                            color="secondary"
                            variant="contained"
                            endIcon={<KeyboardArrowRightIcon/>}>
                            Submit
                        </Button>
                    </form>
                    </div>
                    </div>
                </Container>


                </div>
                )
            }
            export default WorkingDayEmployee;