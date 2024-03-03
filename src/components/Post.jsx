import { BsThreeDots } from "react-icons/bs"
import { BiMessageRounded } from "react-icons/bi"
import { FaRetweet } from "react-icons/fa"
import { AiOutlineHeart } from "react-icons/ai"
import { FcLike } from "react-icons/fc"
import { FiShare2 } from "react-icons/fi"
import { auth, db } from "../firebase/config"
import moment from "moment/moment"
import "moment/locale/tr"
import { toast } from "react-toastify"
import { doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useEffect, useState } from "react"


const Post = ({ tweet }) => {

    const [isLiked, setIsLiked] = useState(false)

    // firebase'daki timestamp değerini tarihe çevirme
    const date = tweet.createdAt?.toDate();
    // tweet atılma tarihinden itibaren geçen zamanı hesaplama
    const timeAgo = moment(date).fromNow()

    // aktif kullanıcının tweeti beğenme durumunun kontrolü
    useEffect(() => {
        const found = tweet.likes.find(
            (userId) => userId === auth.currentUser.uid
        );

        setIsLiked(found);
    }, [tweet]);


    // tweeti silme adımları
    const handleDelete = () => {

        const answer = confirm("Tweeti silmek istiyor musunuz?")
        // silmek istediğimiz doc'un referansını alma
        const ref = doc(db, "tweets", tweet.id)

        // doc silme
        deleteDoc(ref)
            .then(() => toast.error("Tweet silindi."))
            .catch((err) => toast.error("Tweet silinirken bir hata oluştu!"))
    }

    // tweet likelar
    const handleLike = () => {
        const ref = doc(db, "tweets", tweet.id)

        // document güncelleme
        updateDoc(ref, {
            // like atılınca like ekle geri alınca like azalt
            likes: isLiked 
            ? arrayRemove(auth.currentUser.uid) 
            : arrayUnion(auth.currentUser.uid),
        })
    };


    return (
        <div className="flex gap-3 p-3 border-b-[0.5px] border-gray-800">
            <img className="w-14  h-14 rounded-full" src={tweet.user.photo} alt="" /> {/* tweet.user.photo */}

            <div className="w-full">
                {/* kullanıcı bilgisi */}
                <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                        <p className="font-bold">{tweet.user.name}</p>
                        <p className="text-gray-400">@saltkbyhn</p>{/* tweet.user.name.toLowerCase() */}
                        <p className="text-gray-400">{timeAgo}</p>
                    </div>
                    {/* tweeti oturumu açık olan kullanıcı attıysa üç nokta göster */}
                    {tweet.user.id === auth.currentUser.uid && <BsThreeDots className="cursor-pointer transition hover:bg-gray-500 rounded-full" onClick={handleDelete} />}
                </div>

                {/* tweet içeriği */}
                <div className="my-3">
                    <p>{tweet.textContent}</p>
                    {tweet.imageContent && <img className="rounded-lg mt-3" src={tweet.imageContent} alt="tweet görsel" />}
                </div>

                {/* tweet butonları */}
                <div className="flex items-center justify-between">
                    <div className="p-2 rounded-full cursor-pointer transition hover:bg-gray-700">
                        <BiMessageRounded />
                    </div>
                    <div className="p-2 rounded-full cursor-pointer transition hover:bg-gray-700">
                        < FaRetweet />
                    </div>
                    <div
                        onClick={handleLike}
                        className="flex items-center gap-1 p-2 rounded-full cursor-pointer transition hover:bg-gray-700">
                            {/* kullanıcı likeladıysa kırmızı değilse normal kalbi yansıt */}
                        {isLiked ? (<FcLike />) : (<AiOutlineHeart />)}
                        <span>{tweet.likes.length}</span>
                    </div>
                    <div className="p-2 rounded-full cursor-pointer transition hover:bg-gray-700">
                        <FiShare2 />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;