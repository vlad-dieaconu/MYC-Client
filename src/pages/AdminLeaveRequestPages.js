import React, {useEffect, useState} from 'react';
import NavbarAdmin from "../components/NavbarAdmin";
import axios from "axios";
import {Container, Grid} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {useNavigate} from "react-router-dom";
import LeaveRequestTable from "../components/LeaveRequestTable";

const useStyles = makeStyles((theme) => {
        return {
            page: {

                width: '100%',
                height: '100%',

            },
        };
    }
)


const AdminLeaveRequestPages = () => {


    const classes = useStyles();
    const navigate = useNavigate();

    const [user, setUser] = useState({});

    const [leaveRequests, setLeaveRequests] = React.useState([]);

    useEffect(() => {
        axios.get('/api/admin/getAllLeaveRequests')
            .then(res => {
                console.log(res.data);
                setLeaveRequests(res.data);
            })
            .catch(err => {
                console.log(err);
            })
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
            <NavbarAdmin></NavbarAdmin>
            <Container style={{marginTop: 100}}>
                <div>
                    <div className={classes.page}>
                        <Grid container spacing={3}>
                            <LeaveRequestTable leaveRequest={leaveRequests}/>
                        </Grid>
                    </div>

                </div>
            </Container>
        </div>
    );

};

export default AdminLeaveRequestPages;