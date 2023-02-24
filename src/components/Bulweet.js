import { fbFirestore } from "firebaseInstance";
import React from "react";

const Bulweet = ({ bulweetObj, isOwner }) => {
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure to delete this Bulweet?");
        if (ok) {
            await fbFirestore.doc(`/bulweets/${bulweetObj.id}`).delete();
        }
    };

    const onModifyClick = () => {
        console.log("mod clicked");
    };

    return (
        <div>
            <h4>{bulweetObj.text}</h4>
            {isOwner && <>
                <button onClick={onDeleteClick}>Delete</button>
                <button onClick={onModifyClick}>Modify</button>
            </>}
        </div>
    );
}

export default Bulweet;