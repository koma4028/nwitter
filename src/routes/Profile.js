import { fbAuth } from "firebaseInstance";
import React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const history = useNavigate();
    const onSignOutClick = () => {
        fbAuth.signOut();
        history("/");
    }
    return (
        <>
            <button onClick={onSignOutClick}>Sign Out</button>
        </>
    );
}

export default Profile;