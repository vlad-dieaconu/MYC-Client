import React, {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, IconButton, Paper, Typography} from "@mui/material";
import NavbarAdmin from "../components/NavbarAdmin";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import NavbarEmployee from "../components/NavbarEmployee";

const Profile = () => {


    const navigate = useNavigate();

    const [user, setUser] = useState({});
    // const [role, setRole] = useState(user.roles[0]);

    const [profileData, setProfileData] = useState([]);
    const [edit, setEdit] = useState(false);

    const [nume, setNume] = useState();
    const [prenume, setPrenume] = useState();
    const [cnp, setCnp] = useState();

    const local = localStorage.getItem("USER");

    useEffect(() => {
        const id = JSON.parse(local).id;
        axios.get("/api/user/getPersonalDetails", {
            params: {
                id: id
            }
        })
            .then(res => setProfileData(res.data));
        const loggedInUser = localStorage.getItem("USER");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        } else {
            navigate("/home");
        }
        console.log(profileData);
    }, [prenume])

    console.log(user)
    const handleNumeChange = (e) => {
        setNume(e.target.value)
    }
    const handlePrenumeChange = (e) => {
        setPrenume(e.target.value)
    }
    const handleCNPChange = (e) => {
        setCnp(e.target.value)
    }

    const handleSubmit = () => {

        axios.put("/api/user/editProfile", {
            nume: nume,
            prenume: prenume,
            cnp: cnp
        }).then(res =>
            console.log(res.data)
        )
        window.location.reload(false);
        setEdit(false);

    }


    console.log(profileData.prenume);

    return (
        <div>
            <NavbarAdmin></NavbarAdmin>
            <div style={{margin: 200}}>
                <Paper elevation={24}>
                    <Card>
                        <CardHeader
                            style={{textAlign: "center"}}
                            action={

                                <IconButton onClick={() => setEdit(true)}>
                                    <EditIcon/>
                                </IconButton>
                            }
                            title="Your personal info"
                        />
                        {edit ?
                            <CardContent style={{textAlign: "center"}}>
                                <p>Email: {profileData.email}</p>
                                <p>username: {profileData.username}</p>
                                <p>Nume: <input
                                    placeholder={profileData.nume}
                                    onChange={handleNumeChange}>
                                </input></p>
                                <p>Prenume:  <input
                                    type="text"
                                    placeholder={profileData.prenume}
                                    onChange={handlePrenumeChange}>
                                </input></p>
                                <p>CNP: <input
                                    placeholder={profileData.cnp}
                                    onChange={handleCNPChange}>
                                </input> </p>
                                <IconButton onClick={handleSubmit}>
                                    <CheckIcon style={{color: "green"}}/>
                                </IconButton>

                            </CardContent>
                            :
                            <CardContent style={{textAlign: "center"}}>
                                <p>Email: {profileData.email}</p>
                                <p>username: {profileData.username}</p>
                                <p>Nume: {profileData.nume ? profileData.nume : "not set yet"} </p>
                                <p>Prenume: {profileData.prenume ? profileData.prenume : "not set yet"} </p>
                                <p>CNP: {profileData.cnp ? profileData.cnp : "not set yet"} </p>
                            </CardContent>
                        }

                    </Card>
                </Paper>
            </div>
        </div>
    );
};
export default Profile;
