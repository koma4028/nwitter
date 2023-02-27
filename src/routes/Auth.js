import AuthForm from "components/AuthForm";
import { defaultFirebaseApp, fbAuth } from "firebaseInstance";
import React from "react";

const Auth = () => {
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
            <AuthForm />
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with GitHub</button>
            </div>
        </div>
    );
};

export default Auth;