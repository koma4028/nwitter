import React, { useState } from "react";
import { fbAuth } from "firebaseInstance";

const AuthForm = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [newAccount, setNewAccount] = React.useState(true);
    const [error, setError] = useState("");

    const toggleNewAccount = () => {
        setNewAccount((prev) => !prev);
    }

    const onChange = (event) => {
        const { target: { name, value } } = event;
        //const {name, value} = {event.target.name, event.target.value};
        if (name === "email") setEmail(value);
        else if (name === "password") setPassword(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if (newAccount) {
                // Create Account
                await fbAuth.createUserWithEmailAndPassword(email, password);
            } else {
                // Login
                await fbAuth.signInWithEmailAndPassword(email, password);
            }
            // console.log(userData);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <React.Fragment>
            <form className="container" onSubmit={onSubmit}>
                <input
                    className="authInput"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    className="authInput"
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input
                    className="authInput authSubmit"
                    type="submit"
                    value={newAccount ? "Create Account" : "Sign In"}
                />
            </form>
            {error && <span className="authError">{error}</span>}
            <span
                className="authSwitch"
                onClick={toggleNewAccount}
            >
                {newAccount ? "Sign In" : "Create Account"}
            </span>
        </React.Fragment>
    );
};

export default AuthForm;