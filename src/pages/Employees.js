import React, {useEffect, useState} from "react"
import {useLocation, useNavigate} from "react-router-dom";
import {Container} from "@material-ui/core";
import {Alert, Avatar, Grid, Paper, TextField} from "@mui/material";
import axios from "axios";
import EmployeesTable from "../components/EmployeesTable";
import NavbarAdmin from "../components/NavbarAdmin";
import {makeStyles} from "@material-ui/core/styles";

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

const Employees = () => {



    const classes = useStyles();
    const navigate = useNavigate();
    const [employee, setEmployees] = useState([]);
    const [user, setUser] = useState({});




    useEffect(() => {

        axios.get("/api/admin/getEmployees")
            .then(res => setEmployees(res.data));
        const loggedInUser = localStorage.getItem("USER");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        } else {
            navigate("/home");
        }
        console.log(employee);
    }, [])



    return (
        <div>
            <NavbarAdmin></NavbarAdmin>
            <Container style={{marginTop: 100}}>
                    <div>
                        <div className={classes.page}>
                            <Grid container spacing={3}>
                                <EmployeesTable employee={employee}></EmployeesTable>
                            </Grid>
                        </div>

                    </div>
            </Container>
        </div>
    )

}

export default Employees;