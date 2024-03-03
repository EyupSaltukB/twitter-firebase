import React, { useEffect, useState } from 'react'
import TweetForm from './TweetForm'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase/config'
import Post from './Post'

const Main = () => {
    const [tweets, setTweets] = useState(null)
    const tweetCol = collection(db, "tweets");

    useEffect(() => {
        // abone olduğumuz tweetleri sırasına göre filtreleme
        const queryOption = query(tweetCol, orderBy("createdAt", "desc"))
        // collection'a abone olma
        onSnapshot(queryOption, (snapshot) => {
            // geçici olarak tweetlerin tutulduğu dizi
            const tempTweets = [];
            // documentleri dönüp ihtiyacımız olan verileri geçici diziye aktarma
            snapshot.forEach((doc) =>
                tempTweets.push({ ...doc.data(), id: doc.id })
            );
            // state'e tweetleri aktarma
            setTweets(tempTweets)
        })
    }, [])

    return (
        <main className="main col-span-3 md:col-span-2 xl:col-span-1 border border-gray-800 overflow-y-auto">
            <header className='font-bold p-4 border-b-2 border-gray-800'>Anasayfa</header>
            <TweetForm />

            {/* loading */}
            {!tweets && (
                <p className='text-center mt-[200px]'>Yükleniyor...</p>
            )}

            {/* tweetleri listeleme */}
            {tweets?.map((tweet) => (
            <Post key={tweet.id} tweet={tweet}/>
            ))}

        </main>
    )
}

export default Main