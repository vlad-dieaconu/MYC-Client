import React, {useEffect,useState} from "react"
import {useLocation, useNavigate} from "react-router-dom";
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Grid} from "@mui/material";
import axios from "axios";
import EmployeesTable from "../components/EmployeesTable";
import NavbarAdmin from "../components/NavbarAdmin";


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
        <Container>
            <div className={classes.page}>
                <Grid container spacing={3}>
                    <EmployeesTable employee={employee}></EmployeesTable>
                </Grid>
            </div>
            <div>
                {/*<Button onClick={handleFormCreation}>Create a new employee acccount</Button>*/}
            </div>
        </Container>
        </div>
    )

}

export default Employees;