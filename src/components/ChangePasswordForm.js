import React, {useState} from "react";
import ProfileAuth from '../res/auth.svg';
import axios from "axios";
import {Alert} from "reactstrap";
import {useNavigate} from "react-router-dom";

const ChangePasswordForm = (token) => {

    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlerContent] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put("/api/auth/savePassword?token=" + token.token + "&password=" + newPassword)
            .then((res) => {
                setMessage(res.data);
                if (message === "The password was changed!") {
                    setAlert(true);
                    setAlerContent(message);
                    setTimeout(function() {
                        navigate("/");
                    }, 4000);
                }

            })

    }


    const handlePasswordChange = (event) => {
        setNewPassword(event.target.value);
    }

    return (
        <div>
            {<img src={ProfileAuth} className="image-auth"/>}

            <div className="forms-container">
                <div className="signin-signup">
                    <form onSubmit={handleSubmit} className="sign-in-form">
                        <h2 className="title">Insert your new password</h2>

                        <div className="input-field">
                            <i className="email-icon"></i>
                            <input
                                type="password"
                                name="email"
                                id="email"
                                placeholder="New password"
                                onChange={handlePasswordChange}
                            />
                        </div>

                        <button type="submit" className="btn-solid">
                            SUBMIT
                        </button>

                        {alert && <Alert color="success">{alertContent}</Alert>}
                    </form>
                </div>
            </div>
        </div>


    )

}
export default ChangePasswordForm;