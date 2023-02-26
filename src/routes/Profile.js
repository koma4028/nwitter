import { fbAuth, fbFirestore } from "firebaseInstance";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile({ userObj, refreshUser }) {
    const history = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onSignOutClick = () => {
        fbAuth.signOut();
        history("/");
    };
    const getMyBulweets = async () => {
        const bulweets = await fbFirestore
            .collection("bulweets")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createDate", "desc")
            .get();
        console.log(bulweets);
    };
    const onSubmit = async (event) => {
        console.log("Profile onSubmit");
        event.preventDefault();
        if (newDisplayName !== userObj.displayName) {
            await fbAuth.currentUser.updateProfile({
                displayName: newDisplayName,
            }).then(console.log("update profile complete"));
            console.log("before refresh user");
            refreshUser();
        };
    };
    const onChange = (event) => {
        setNewDisplayName(event.target.value);
    };
    useEffect(() => {
        // getMyBulweets();
    }, []);

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Input Your Nickname"
                    value={newDisplayName}
                    onChange={onChange}
                />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onSignOutClick}>Sign Out</button>
        </>
    );
}

export default Profile;