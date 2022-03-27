import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import axios from "axios";
import ChangePasswordForm from "../components/ChangePasswordForm";

const ChangePassword = () => {

    let tokenObject = useParams();
    const [validToken, setValidToken] = useState(true);
    const token = tokenObject.token

    useEffect(() => {
        axios.get("/api/auth/changePassword?token=" + tokenObject.token)
            .then((res) => {
                console.log(res.data)
                if (res.data !== "Valid token") {
                    setValidToken(false);
                }
                ;
            });
    }, [])


    return (
        <div>
            {validToken ?
                <ChangePasswordForm token={token}/>
                :
                <p>Not a valid token</p>
            }
        </div>
    )

}
export default ChangePassword;