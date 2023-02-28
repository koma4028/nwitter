import AuthForm from "components/AuthForm";
import { defaultFirebaseApp, fbAuth } from "firebaseInstance";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle, faGithub, faGit } from "@fortawesome/free-brands-svg-icons";

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
        // console.log(data);
    }

    return (
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 50 }}
            />
            <AuthForm />
            <div className="authBtns">
                <button
                    className="authBtn"
                    name="google"
                    onClick={onSocialClick}
                >
                    Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button
                    className="authBtn"
                    name="github"
                    onClick={onSocialClick}
                >
                    Continue with GitHub <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    );
};

export default Auth;