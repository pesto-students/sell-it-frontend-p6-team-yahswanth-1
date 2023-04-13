import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";

import { login as loginApi } from "../../api";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import { Button, Typography } from "@mui/material";
import Loginwindow from "../../assets/img/login.svg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const login = () => {
    setButtonLoading(true);
    loginApi(email, password)
      .then((res) => {
        const data = res.data.response;
        localStorage.setItem("admin", JSON.stringify(data));
        toast.success("Success");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      })
      .finally(() => {
        setButtonLoading(false);
      });
  };
  const onChangeEmail = (val) => {
    setEmail(val);
  };
  const onChangePassword = (val) => {
    setPassword(val);
  };

  const onCheck = (e) => {
    setRememberMe((old) => !old);
  };

  useEffect(() => {
    if (email && password) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [email, password]);

  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("admin"));
    if (login) {
      navigate("/");
    }
  }, []);
  return (
    <div className="login-page">
      <div>
        <Typography
          variant="h5"
          sx={{
            marginLeft: 10,
            marginTop: 2,
          }}
        >
          Sell your product , any time
        </Typography>

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
            {/* <div className="mt-2">
              <Link to={"/forgot-password"}>Forgot password ?</Link>
            </div> */}
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={rememberMe} onChange={onCheck} />}
                label="Remember me"
              />
            </FormGroup>
            <LoadingButton
              sx={{
                marginTop: 2,
              }}
              variant="contained"
              onClick={login}
              disabled={disable}
              loading={buttonLoading}
            >
              Login
            </LoadingButton>
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
