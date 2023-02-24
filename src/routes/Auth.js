import { defaultFirebaseApp, fbAuth } from "firebaseInstance";
import React, { useState } from "react";

const Auth = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [newAccount, setNewAccount] = React.useState(true);
    const [error, setError] = useState("");

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

    const toggleNewAccount = () => {
        setNewAccount((prev) => !prev);
    }

    const onSocialClick = async (event) => {
        const { target: { name }, } = event;  // ES6
        let provider;
        if (name === "google") {
            provider = new defaultFirebaseApp.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new defaultFirebaseApp.auth.GithubAuthProvider();
        }
        const data = await fbAuth.signInWithPopup(provider);
        console.log(data);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
            </form>
            {error}
            <span onClick={toggleNewAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with GitHub</button>
            </div>
        </div>
    );
};

export default Auth;