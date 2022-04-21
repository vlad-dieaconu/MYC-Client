import React, {useEffect} from 'react';

import 'react-dates/lib/css/_datepicker.css';
import NavbarEmployee from "../components/NavbarEmployee";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import LeaveRequest from "../components/LeaveRequest";
import LeaveRequestsList from "../components/LeaveRequestsList";

const LeaveRequestsPage = () => {

    const navigate = useNavigate();
    const [user, setUser] = React.useState(null);


    const [leavingRequests, setLeavingRequests] = React.useState([]);
    const [freeDays, setFreeDays] = React.useState('');
    const [freeDaysTaken, setFreeDaysTaken] = React.useState('');


    useEffect( async() => {
        

            await axios.get('api/user/getLeavingPermissionRequests')
            .then(res => {
                console.log("dd")
                console.log(res.data)
                setLeavingRequests(res.data);
                setFreeDays(res.data[0].user.freeDays);
                setFreeDaysTaken(res.data[0].user.freeDaysTaken);
            })
            .catch(err => {
                console.log(err);
            });
        const loggedInUser = localStorage.getItem("USER");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        } else {
            navigate("/home");
        }
    }, []);



    return (
        <div>
            <NavbarEmployee/>
            <div>
                <h4>Zile de concediu</h4>
                <p>Luate {+" " + freeDaysTaken}</p>
                <p>Ramase {+" " +freeDays}</p>
            </div>
            <LeaveRequest/>

            <div>
                {leavingRequests.map(request => {
                    return <LeaveRequestsList leaveRequest={request}/>
                })}
            </div>
        </div>
    );
};
export default LeaveRequestsPage;
