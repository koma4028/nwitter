import { fbFirestore, fbStorage } from "firebaseInstance";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const BulweetFactory = ({ userObj }) => {
    const fileReader = new FileReader();
    const [fileState, setFileState] = useState();
    const [bulweet, setBulweet] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        let fileDownloadUrl = "";
        if (fileState !== null && fileState !== "") {
            const fileRef = fbStorage.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await fileRef.putString(fileState, "data_url");
            fileDownloadUrl = await response.ref.getDownloadURL();
        }
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
        setFileState(null);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="What's on your mind?"
                    value={bulweet}
                    onChange={onSubmitChange}
                    required
                    maxLength={120}
                />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Bulweet" />
                {
                    fileState && (
                        <div>
                            <img alt={""} src={fileState} width="50px" height="50px" />
                            <button onClick={onClearFileState}>Clear</button>
                        </div>
                    )
                }
            </form>
        </div>
    );
};

export default BulweetFactory;