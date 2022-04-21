import React from 'react'
import {Stack, Switch} from "@mui/material";
import {DateRangePicker} from "react-dates";
import axios from "axios";

const LeaveRequest = () => {

    const [vacationSwitch, setVacationSwitch] = React.useState(false);
    const [medicalSwitch, setMedicalSwitch] = React.useState(false);
    const [familySwitch, setFamilySwitch] = React.useState(false);

    const [leaveType, setLeaveType] = React.useState('');

    const [startDate, setStartDate] = React.useState();
    const [endDate, setEndDate] = React.useState();
    const [focusedInput, setFocusedInput] = React.useState();



    const handleSubmitRequest = () => {
        axios.post("/api/user/leaveRequest", {

            startDay: startDate,
            endDay: endDate,
            leavingType: leaveType,

        }).then(res => {
            console.log(res.data);
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
            <div>
                <h4>Request for vacation </h4>
                {/*<p>Free days left: {userFreeDays}</p>*/}
            </div>
            <Stack>

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

                <div>
                    Vacation
                    <Switch
                        checked={vacationSwitch}
                        onChange={handleVacationSwitchChange}
                        inputProps={{'aria-label': 'controlled'}}
                    />
                </div>
                <div>
                    Medical reasons
                    <Switch
                        checked={medicalSwitch}
                        onChange={handleMedicalSwitchChange}
                        inputProps={{'aria-label': 'controlled'}}
                    />
                </div>
                <div>
                    Family reasons
                    <Switch
                        checked={familySwitch}
                        onChange={handleFamilySwitchChange}
                        inputProps={{'aria-label': 'controlled'}}
                    />
                </div>

                <button onClick={handleSubmitRequest}>Make the request</button>

            </Stack>
        </div>
    );

}
export default LeaveRequest;