import { fbFirestore, fbStorage } from "firebaseInstance";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const BulweetFactory = ({ userObj }) => {
    const fileReader = new FileReader();
    const [fileState, setFileState] = useState("");
    const [bulweet, setBulweet] = useState("");

    const onSubmit = async (event) => {
        if (bulweet === "") {
            return;
        };
        event.preventDefault();
        let fileDownloadUrl = "";
        if (fileState !== null && fileState !== "") {
            const fileRef = fbStorage.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await fileRef.putString(fileState, "data_url");
            fileDownloadUrl = await response.ref.getDownloadURL();
        };
        await fbFirestore.collection("bulweets").add({
            text: bulweet,
            createDate: Date.now(),
            creatorId: userObj.uid,
            downloadUrl: fileDownloadUrl,
        });
        setBulweet("");
        setFileState("");
    };

    const onSubmitChange = (event) => {
        const { target: { value } } = event;
        setBulweet(value);
    };

    const onFileChange = (event) => {
        const { target: { files } } = event;
        const uploadFile = files[0];
        // Add Event Listner
        fileReader.onloadend = (event) => {
            //console.log(event.currentTarget.result);
            setFileState(event.currentTarget.result);
        };
        fileReader.readAsDataURL(uploadFile);
    };

    const onClearFileState = () => {
        setFileState("");
    };

    return (
        <form className="factoryForm" onSubmit={onSubmit}>
            <div className="factoryInput__container">
                <input
                    className="factoryInput__input"
                    type="text"
                    placeholder="What's on your mind?"
                    value={bulweet}
                    onChange={onSubmitChange}
                    required
                    maxLength={120}
                />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            {/* label & input 고치고 싶음
            label을 input에 연결하고 input은 opacity로 숨기는 방식인 것 같은데 보이지만 않지 클릭이 됨 */}
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photo</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                    opacity: 0,
                }}
            />
            {
                fileState && (
                    <div className="factoryForm__attachment">
                        <img
                            src={fileState}
                            style={{
                                backgroundImage: fileState,
                            }}
                        />
                        <div className="factoryForm__clear" onClick={onClearFileState}>
                            <span>Remove</span>
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                    </div >
                )
            }
        </form>
    );
};

export default BulweetFactory;