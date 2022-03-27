import React, { useEffect, useState } from "react";
import Social from "../res/1.svg";
import { Alert } from "reactstrap";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import {Button} from "@mui/material";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");

  const [role, setRole] = useState(() => {
    if (AuthService.getCurrentUser()) {
      const currentUser = AuthService.getCurrentUser();
      const roleFromLocalStorage = currentUser.roles[0];
      return roleFromLocalStorage;
    }
    return "";
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (AuthService.getCurrentUser() !== null) {
      navigate("/dashboard", { state: { role: role } });
    }

    if (role.length != 0) {
      navigate("/dashboard", { state: { role: role } });
    }
  }, [role]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    AuthService.login(username, password)
      .then((response) => {
        const currentUser = AuthService.getCurrentUser();
        console.log(currentUser);
        console.log(currentUser.roles[0]);
        setRole(currentUser.roles[0]);
        window.location.reload(false);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setAlertContent("Bad credentials !");
          setAlert(true);
        }
        throw err;
      });
  };

  return (
    <body>
      <div class="container">
        <div class="forms-container">
          <div class="signin-signup">
            <form onSubmit={handleSubmit} class="sign-in-form">
              <h2 class="title">Sign in</h2>

              <div class="input-field">
                <i class="email-icon"></i>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  onChange={handleUsernameChange}
                />
              </div>

              <div class="input-field">
                <i class="password-icon"></i>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                />
              </div>

              <button type="submit" class="btn-solid">
                Login
              </button>

              {alert && <Alert color="danger">{alertContent}</Alert>}
            </form>
            <Button onClick={() =>  navigate("/forgotPassword")}>
              Have you forgotten the password?
            </Button>
          </div>
        </div>

        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content" type="text">
              <h1>About Manage Your Company</h1>
              <p>
                The ultimate Password Manager, 1Password remembers them all for
                you. Use strong, unique passwords and a password manager to keep
                track of them.
              </p>
              <br></br>
              <h3>Manage your employees from everywhere</h3>
              <h3>Go ahead! Forget about going to the office !</h3>
            </div>

            {<img src={Social} class="image-login" />}
          </div>
        </div>
      </div>
    </body>
  );
};

export default LoginForm;
