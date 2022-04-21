import React, {useState, useEffect} from "react";
import AuthService from "../services/AuthService";
import NavbarAdmin from "../components/NavbarAdmin";
import {useLocation, useNavigate} from "react-router-dom";
import NavbarEmployee from "../components/NavbarEmployee";

const Dashboard = () => {
    const {state} = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [admin, setAdmin] = useState(false);
    const [basicUser, setBasicUser] = useState(false);
    const [role, setRole] = useState(() => {
        if (AuthService.getCurrentUser()) {
            const currentUser = AuthService.getCurrentUser();
            const roleFromLocalStorage = currentUser.roles[0];
            return roleFromLocalStorage;
        }
        return "";
    });

    useEffect(() => {
        const loggedInUser = localStorage.getItem("USER");

        if (state.role == "ROLE_ADMIN") {
            setAdmin(true);
        }
        if (state.role == "ROLE_USER") {
            setBasicUser(true);
        }
        console.log(role)
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        } else {
            navigate("/home");
        }

    }, []);

    return (
        <div>
            <div>
                {
                    admin ? <NavbarAdmin/> : <NavbarEmployee/>
                }
            </div>

        </div>

    )

};
export default Dashboard;
