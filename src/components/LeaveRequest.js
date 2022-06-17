import React, {useState} from 'react'
import {Button, Stack, Switch} from "@mui/material";
import {DateRangePicker} from "react-dates";
import axios from "axios";
import { Alert } from "reactstrap";

const LeaveRequest = () => {

    const [vacationSwitch, setVacationSwitch] = React.useState(false);
    const [medicalSwitch, setMedicalSwitch] = React.useState(false);
    const [familySwitch, setFamilySwitch] = React.useState(false);

    const [leaveType, setLeaveType] = React.useState('');

    const [startDate, setStartDate] = React.useState();
    const [endDate, setEndDate] = React.useState();
    const [focusedInput, setFocusedInput] = React.useState();

    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState("");



    const handleSubmitRequest = () => {
        axios.post("/api/user/leaveRequest", {

            startDay: startDate,
            endDay: endDate,
            leavingType: leaveType,

        }).then(res => {
            console.log(res.data);
            setAlert(true);
            setAlertContent("Leave request sent successfully");
        }).catch(err => {
            console.log(err.response.data);
        })
    }





    const handleVacationSwitchChange = (event) => {
        setVacationSwitch(event.target.checked);
        setLeaveType('vacation')

    };

    const handleMedicalSwitchChange = (event) => {
        setMedicalSwitch(event.target.checked);
        setLeaveType('medical')
    };

    const handleFamilySwitchChange = (event) => {
        setFamilySwitch(event.target.checked);
        setLeaveType('family')
    };



    return (
        <div>
            <div
                style={
                    {
                        marginLeft: '20px',
                        fontWeight: 'bold',
                        backgroundColor: 'lightGrey',
                        position: "absolute",
                        transform: "translate(-50%, -50%)",
                        top: "10%",
                        left: "50%"

                    }
                }
            >
                <h4>Request for vacation </h4>

            </div>
            <div
                style={
                    {
                        marginLeft: '20px',
                        fontWeight: 'bold',
                        position: "absolute",
                        transform: "translate(-50%, -50%)",
                        top: "15%",
                        left: "50%"

                    }
                }
            >
                <p>Select the period you want </p>

            </div>
            <Stack
                style={
                    {

                        position: "absolute",
                        top: "30%",
                        transform: "translate(-50%, -50%)",
                        left: "50%"
                    }
                }
            >

                <DateRangePicker
                    startDate={startDate}
                    startDateId="start-date"
                    endDate={endDate}
                    endDateId="end-date"
                    onDatesChange={({startDate, endDate}) => {
                        setStartDate(startDate);
                        setEndDate(endDate);
                    }}
                    focusedInput={focusedInput}
                    minimumNights={0}
                    onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}

                />

                <div
                    style={
                        {
                            fontWeight: 'bold',
                            marginTop: '5px',
                            marginLeft: '15px'
                        }
                    }
                >
                    Vacation
                    <Switch
                        checked={vacationSwitch}
                        onChange={handleVacationSwitchChange}
                        inputProps={{'aria-label': 'controlled'}}
                    />
                </div>
                <div
                    style={
                        {
                            marginTop: '5px',
                            fontWeight: 'bold',
                            marginLeft: '15px'
                        }
                    }
                >
                    Medical reasons
                    <Switch
                        checked={medicalSwitch}
                        onChange={handleMedicalSwitchChange}
                        inputProps={{'aria-label': 'controlled'}}
                    />
                </div>
                <div
                    style={
                        {
                            fontWeight: 'bold',
                            marginTop: '5px',
                            marginLeft: '15px'
                        }
                    }
                >
                    Family reasons
                    <Switch
                        checked={familySwitch}
                        onChange={handleFamilySwitchChange}
                        inputProps={{'aria-label': 'controlled'}}
                    />
                </div>

                <Button
                    style={
                        {
                            marginTop: '10px',
                            width: '100%',
                            backgroundColor: 'green',
                            color: 'black',
                            fontWeight: 'bold'

                        }
                    }
                    onClick={handleSubmitRequest}>Make the request</Button>
                    {alert && <Alert color="success">{alertContent}</Alert>}
            </Stack>
        </div>
    );

}
export default LeaveRequest;
