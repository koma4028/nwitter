import { fbFirestore, fbStorage } from "firebaseInstance";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import Bulweet from "components/Bulweet";

const Home = ({ userObj }) => {
    const fileReader = new FileReader();
    const [bulweet, setBulweet] = useState("");
    const [bulweetList, setBulweetList] = useState([]);
    const [fileState, setFileState] = useState();

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

    useEffect(() => {
        console.log("Execute useEffect");
        // 중요!
        // onSnapShot을 useEffect 내에서 최초로 불렀을 때 Callback Function이 실행되고,
        // 이 때 firestore.collection.onSnapshot에 parameter로 입력한 함수가 실행 및 firebase 객체에 저장된다.
        // 이후에는 useEffect와 무관하게 DB 변경이 있을 때마다 onSnapshot Callback'만' 실행된다.
        // = Add Event Listner
        fbFirestore.collection("bulweets").onSnapshot((snapshot) => {
            console.log("Eventlistener listened a snapshot has been changed");
            const bulweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setBulweetList(bulweetArray);
        });
    }, []);

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
                {fileState && (
                    <div>
                        <img src={fileState} width="50px" height="50px" />
                        <button onClick={onClearFileState}>Clear</button>
                    </div>
                )}
            </form>
            <div>
                {bulweetList.map((eachBulweet) =>
                    <Bulweet
                        key={eachBulweet.id}
                        bulweetObj={eachBulweet}
                        isOwner={eachBulweet.creatorId === userObj.uid ? true : false}
                    />
                )}
            </div>
        </div>
    );
};

export default Home;