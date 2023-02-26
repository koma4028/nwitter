import { fbFirestore } from "firebaseInstance";
import React, { useEffect, useState } from "react";
import Bulweet from "components/Bulweet";
import BulweetFactory from "components/BulweetFactory";

const Home = ({ userObj }) => {
    const [bulweetList, setBulweetList] = useState([]);

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
            <BulweetFactory userObj={userObj} />
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