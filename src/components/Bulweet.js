import { fbFirestore } from "firebaseInstance";
import React, { useState } from "react";

const Bulweet = ({ bulweetObj, isOwner }) => {
    const [isEditing, setEditing] = useState(false);
    const [bulweetText, setBulweetText] = useState(bulweetObj.text);

    const onChange = (event) => {
        setBulweetText(event.target.value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        await fbFirestore.doc(`/bulweets/${bulweetObj.id}`).update(
            {
                text: bulweetText,
            }
        );
        setEditing(false);
    };

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure to delete this Bulweet?");
        if (ok) {
            await fbFirestore.doc(`/bulweets/${bulweetObj.id}`).delete();
        }
    };

    const onModifyClick = () => {
        toggleEditing();
    };

    const onCalcelClick = (event) => {
        setBulweetText(bulweetObj.text);
        toggleEditing();
    };

    const toggleEditing = () => setEditing(prev => !prev);

    return (
        <div>
            {
                (isOwner && isEditing) ? (
                    <>
                        <form onSubmit={onSubmit}>
                            <input
                                type="text"
                                placeholder="Edit your Bulweet"
                                value={bulweetText}
                                required
                                onChange={onChange}
                                maxLength={120}
                            />
                            <input 
                                type="submit"
                                value="Update"
                            />
                        </form>
                        <button
                            onClick={onCalcelClick}
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <h4>{bulweetText}</h4>
                    </>
                )
            }
            {(isOwner && !isEditing) && <>
                <button onClick={onDeleteClick}>Delete</button>
                <button onClick={onModifyClick}>Modify</button>
            </>}
        </div>
    );
}

export default Bulweet;