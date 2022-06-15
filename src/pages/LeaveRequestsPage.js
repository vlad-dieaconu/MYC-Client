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


    useEffect(async () => {


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
            <div
                style={{
                    position: "absolute",
                    top: "80px",
                    right: "150px",
                    backgroundColor: 'lightgrey'
                }}
            >
                <h4
                    style={{
                        marginTop: '10px',
                        marginLeft: '15px',
                        marginRight: '15px',
                    }}
                >Vacation days</h4>
                <p
                    style={{
                        marginTop: '2px',
                        marginLeft: '15px'
                    }}
                >Taken: {+" " + freeDaysTaken}</p>
                <p
                    style={{
                        marginTop: '2px',
                        marginLeft: '15px'
                    }}
                >Left: {+" " + freeDays}</p>
            </div>
            <LeaveRequest/>

            <h4
                style={
                    {
                        marginLeft: '30px',
                        marginRight: '1300px',
                        marginTop: '30px',
                        right: "100px"
                    }
                }
            >
                Requests seen by the administrator
            </h4>

            <div
                style={
                    {
                        top: "15%",
                        fontWeight: 'bold',
                        marginLeft: '30px',
                        marginRight: '1500px',
                    }
                }
            >
                {leavingRequests.map(request => {
                    return <LeaveRequestsList leaveRequest={request}/>
                })}
            </div>
        </div>
    );


};
export default LeaveRequestsPage;
