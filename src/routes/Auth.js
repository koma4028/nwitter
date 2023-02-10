import { fbAuth } from "firebaseInstance";
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
            let userData;
            if (newAccount) {
                // Create Account
                userData = await fbAuth.createUserWithEmailAndPassword(email, password);
            } else {
                // Login
                userData = await fbAuth.signInWithEmailAndPassword(email, password);
            }
            console.log(userData);
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleNewAccount = () => {
        setNewAccount((prev) => !prev);
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
                <button>Continue with Google</button>
                <button>Continue with GitHub</button>
            </div>
        </div>
    );
};

export default Auth;