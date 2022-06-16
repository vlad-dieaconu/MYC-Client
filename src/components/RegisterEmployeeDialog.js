import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import {DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {Button} from "reactstrap";
import axios from "axios";
import { Alert } from "reactstrap";

const RegisterEmployeeDialog = (dialog) => {

    const [dialogHere, setDialog] = useState(dialog);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [registerMessage, setRegisterMessage] = useState();
    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState("success");


    function handleClose() {
        setDialog(false);
        window.location.reload();
    }


    const handleSubmit = async () => {
        await axios.post("http://localhost:8080/api/auth/signup", {
            username: username,
            password: password,
            email: email
        }).then((res) =>{
            setRegisterMessage(res.data.message)
            setAlertType("success")
            setAlert(true);
            setTimeout(function() {
                setDialog(false);
                window.location.reload();
            }, 4000);
        }).catch(error => {
            console.log('response: ', error.response.data);
            setRegisterMessage(error.response.data.message)
            setAlertType("danger")
            setAlert(true);
            setTimeout(function() {
                setDialog(false);
                window.location.reload();
            }, 4000);
        });
    }

    function handleUsernameChange(event) {
        console.log(username);
        setUsername(event.target.value);

    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }


    return (
        <div>
            <Dialog open={dialogHere} onClose={handleClose}>
                <DialogTitle>Create a new employee account</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create a new employee account based on personal email and name.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={handleEmailChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label="Username"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleUsernameChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={handlePasswordChange}
                    />

                    {alert && <Alert color={alertType}>{registerMessage}</Alert>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default RegisterEmployeeDialog;