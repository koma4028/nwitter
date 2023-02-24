import { fbFirestore } from "firebaseInstance";
import React, { useEffect, useState } from "react";
import Bulweet from "components/Bulweet";

const Home = ({ userObj }) => {
    const [bulweet, setBulweet] = useState("");
    const [bulweetList, setBulweetList] = useState([]);

    const onSubmit = async (event) => {
        event.preventDefault();
        await fbFirestore.collection("bulweets").add({
            text: bulweet,
            createDate: Date.now(),
            creatorId: userObj.uid,
        });
        setBulweet("");
    };

    const onChange = (event) => {
        const { target: { value } } = event;
        setBulweet(value);
    }

    useEffect(() => {
        console.log("useEffect");
        // onSnapShot을 useEffect 내에서 최초로 불렀을 때 Callback Function이 실행되고,
        // 이후에는 useEffect와 무관하게 DB 변경이 있을 때마다 onSnapshot Callback이 실행된다.
        fbFirestore.collection("bulweets").onSnapshot((snapshot) => {
            console.log("onSnapshot");
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
                    onChange={onChange}
                    maxLength={120} />
                <input type="submit" value="Bulweet" />
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