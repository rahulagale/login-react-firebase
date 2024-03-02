import React, { useState } from "react";
import InputControl from "../InputControl/InputControl";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

export default function SignUp() {
    const navigate = useNavigate();
    const [values, setValue] = useState({
        name:"",
        email:"",
        pass:"",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSubmission = () => {
        if (!values.name || !values.email || !values.pass) {
          setErrorMsg("Fill all fields");
          return;
        }
        setErrorMsg("");

        setSubmitButtonDisabled(true);
        createUserWithEmailAndPassword(auth, values.email, values.pass)
            .then(async(res) => {
                setSubmitButtonDisabled(false);
                const user = res.user;
                await updateProfile(user,{
                    displayName:values.name,
                });
            navigate("/");
            })
            .catch((err) => { 
                setSubmitButtonDisabled(false);
                setErrorMsg(err.message);
            });
    };

    return ( 
    <div className={styles.container}>
        <div className={styles.innerbox}>
            <h1 className={styles.heading}>SignUp</h1>

            <InputControl
                label="Name"
                placeholder="Enter your name"
                onChange={(event) =>
                setValue((prev) => ({ ...prev, name: event.target.value }))
            }/>
            <InputControl
                label="Email"
                placeholder="Enter email address"
                onChange={(event) =>
                setValue((prev) => ({ ...prev, email: event.target.value }))
            }/>
            <InputControl
                label="Password"
                placeholder="Enter password"
                onChange={(event) =>
                setValue((prev) => ({ ...prev, pass: event.target.value }))
            }/>

            <div className={styles.footer}>
                <b className={styles.error}>{errorMsg}</b>
                <button onClick={handleSubmission} disabled={submitButtonDisabled}>
                    Sign Up
                </button>
                <p>
                    Already have an account?{" "}
                    <span>
                        <Link  to="/login">Login</Link>
                    </span>
                </p>
            </div>

        </div>
    </div> 
    );
}