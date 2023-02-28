import { fbFirestore, fbStorage } from "firebaseInstance";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
            await fbStorage.refFromURL(bulweetObj.downloadUrl).delete();
        }
    };

    const onModifyClick = () => {
        toggleEditing();
    };

    const onCancelClick = (event) => {
        setBulweetText(bulweetObj.text);
        toggleEditing();
    };

    const toggleEditing = () => setEditing(prev => !prev);

    return (
        <div className="bulweet">
            {
                (isOwner && isEditing) ? (
                    <>
                        <form onSubmit={onSubmit} className="container bulweetEdit">
                            <input
                                className="formInput"
                                type="text"
                                placeholder="Edit your Bulweet"
                                value={bulweetText}
                                required
                                autoFocus
                                onChange={onChange}
                                maxLength={120}
                            />
                            <input
                                className="formBtn"
                                type="submit"
                                value="Update"
                            />
                        </form>
                        <span onClick={onCancelClick} className="formBtn cancelBtn">
                            Cancel
                        </span>
                    </>
                ) : (
                    <>
                        <h4>{bulweetText}</h4>
                        {bulweetObj.downloadUrl && <img src={bulweetObj.downloadUrl} />}
                    </>
                )
            }
            {(isOwner && !isEditing) &&
            <div className="bulweet__actions">
                <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={onModifyClick}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>}
        </div>
    );
}

export default Bulweet;