import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { login as loginApi } from "../../api";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import { Button } from "@mui/material";
import Loginwindow from "../../assets/img/login.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);
  const login = () => {
    loginApi(email, password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const onChangeEmail = (val) => {
    setEmail(val);
  };
  const onChangePassword = (val) => {
    setPassword(val);
  };

  useEffect(() => {
    if (email && password) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [email, password]);
  return (
    <div className="login-page">
      <div>
        <h2 className="login-heading">Sell your product , any time</h2>
        <div className="ml-10">
          <h4>Admin Login</h4>
          <div className="flex flex-col">
            <div>
              <h4 className="label-input"> Email </h4>
              <FormControl variant="filled">
                <InputLabel htmlFor="filled-adornment-amount">Email</InputLabel>
                <FilledInput
                  id="email"
                  onChange={(e) => onChangeEmail(e.target.value)}
                  value={email}
                  type="email"
                  startAdornment={
                    <InputAdornment position="start">
                      {" "}
                      <EmailIcon />{" "}
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div>
              <h4 className="label-input"> Password </h4>
              <FormControl variant="filled">
                <InputLabel htmlFor="filled-adornment-amount">
                  Password
                </InputLabel>
                <FilledInput
                  id="password"
                  value={password}
                  type="password"
                  onChange={(e) => onChangePassword(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      {" "}
                      <LockIcon />{" "}
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="mt-2">
              <Link to={"/forgot-password"}>Forgot password ?</Link>
            </div>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember me"
              />
            </FormGroup>
            <Button
              sx={{
                marginTop: 2,
              }}
              variant="contained"
              onClick={login}
              disabled={disable}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
      <div>
        <img src={Loginwindow} className="login-image" alt="login image" />
      </div>
    </div>
  );
};
export default Login;
