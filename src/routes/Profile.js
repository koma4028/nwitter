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
        // console.log(bulweets);
    };
    // 수업에서는 async/await 사용 안해도 되던데 왜 반드시 써야 Re-rendering 하는지 확인 필요
    const onSubmit = async (event) => {
        event.preventDefault();
        if (newDisplayName !== userObj.displayName) {
            await fbAuth.currentUser.updateProfile({
                displayName: newDisplayName,
            });
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
        <div className="container">
            <form className="profileForm" onSubmit={onSubmit}>
                <input
                    className="formInput"
                    type="text"
                    placeholder="Input Your Nickname"
                    autoFocus
                    value={newDisplayName}
                    onChange={onChange}
                />
                <input
                    className="formBtn upperMargin10"
                    type="submit"
                    value="Update Profile"
                />
            </form>
            <button
                className="formBtn upperMargin30"
                onClick={onSignOutClick}
            >
                Sign Out
            </button>
        </div>
    );
}

export default Profile;