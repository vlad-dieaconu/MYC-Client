import React, {useState} from 'react';
import Forgot from "../res/forgotpassword.svg";
import {Alert} from "reactstrap";
import axios from "axios";

const ForgotPassword = () => {


    const [email, setEmail] = useState("");

    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState("");
    const [alertColor, setAlertColor] = useState("");

    const handleSubmit = async (event) => {

        event.preventDefault();

         axios.post("/api/auth/resetPassword?email=" + email)
            .then( (res) => {
                setAlertContent(res.data);
                setAlertColor("success")
                setAlert(true);
            })
            .catch(async (error) => {
                console.log('response: ', error.response.data.message)
                await setAlertContent(error.response.data.message);
                setAlertColor("danger");
                setAlert(true);


            });

    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }


    return (
        <body>
        <div className="container">
            <div className="forms-container">
                <div className="signin-signup">
                    <form onSubmit={handleSubmit} className="sign-in-form">
                        <h2 className="title">Reset your password!</h2>

                        <div className="input-field">
                            <i className="email-icon"></i>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Email"
                                onChange={handleEmailChange}
                            />
                        </div>

                        <button type="submit" className="btn-solid">
                            Send email
                        </button>

                        {alert && <Alert color={alertColor}>{alertContent}</Alert>}
                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content" type="text">
                        <h1>Change your password now!</h1>
                        <p>
                            Please use your email to reset your password. An email will be send to that address with all
                            the feature steps.
                        </p>
                        <br></br>
                        <h3>You don't remember your email?</h3>
                        <h3>No problem, ask your administrator!</h3>
                    </div>

                    {<img src={Forgot} className="image-login"/>}
                </div>
            </div>
        </div>
        </body>
    )

}
export default ForgotPassword;