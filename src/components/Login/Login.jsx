import React, { useState } from "react";
import styles from './Login.module.css'
import InputControl from "../InputControl/InputControl";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function Login() {

    const navigate = useNavigate();
    const [values, setValue] = useState({
        email:"",
        pass:"",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSubmission = () => {
        if (!values.email || !values.pass) {
          setErrorMsg("Fill all fields");
          return;
        }
        setErrorMsg("");

        setSubmitButtonDisabled(true);
        signInWithEmailAndPassword(auth, values.email, values.pass)
            .then(async(res) => {
                setSubmitButtonDisabled(false);
                
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
            <h1 className={styles.heading}>Login</h1>

            <InputControl 
                className={InputControl}
                onChange={event => 
                    setValue((prev) => ({ ...prev, email:event.target.value }))
                }
                label="Email" 
                placeholder="Enter email address">
            </InputControl>
            <InputControl 
                className={styles.InputControlPassword} 
                onChange={event => 
                    setValue((prev) => ({ ...prev, pass:event.target.value }))
                }
                label="Password" 
                placeholder="Enter password">
            </InputControl>

            <div className={styles.footer}>
                <b className={styles.error}>{errorMsg}</b>
                <button disabled={submitButtonDisabled} onClick={handleSubmission}>Login</button>
                <p>
                    Already have an account?{" "}
                    <span>
                        <Link  to="/signup">Sign up</Link>
                    </span>
                </p>
            </div>

        </div>
    </div> 
    );
}

export default Login;