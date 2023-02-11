import { fbFirestore } from "firebaseInstance";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [bulweet, setBulweet] = useState("");
    const [bulweetList, setBulweetList] = useState([]);

    const onSubmit = async (event) => {
        event.preventDefault();
        await fbFirestore.collection("bulweets").add({
            content: bulweet,
            createDate: Date.now()
        });
        setBulweet("");
    };

    const onChange = (event) => {
        const { target: { value } } = event;
        setBulweet(value);
    }

    const getBulweets = async () => {
        // collection.get()의 return인 Promise<QuerySnapshot>은 await 후에 QuerySnapshot을 반환한다.
        const dbList = await fbFirestore.collection("bulweets").get();
        let newDbList = [];

        dbList.forEach((result) => {
            const bulObject = {
                ...result.data(),
                id: result.id
            };
            newDbList = [bulObject, ...newDbList];
        });

        setBulweetList(newDbList);
    };

    useEffect(() => {
        getBulweets();
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
                    <div key={eachBulweet.id}>
                        <h4>{eachBulweet.content}</h4>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;