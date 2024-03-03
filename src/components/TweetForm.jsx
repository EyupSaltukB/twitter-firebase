import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { auth, db, storage } from "./../firebase/config"
import { BsCardImage } from "react-icons/bs"
import {toast} from "react-toastify"
// herhangi bir mediayı storge'a yükleme / URL'sini alma / resmin yerini alma
import { uploadBytes, getDownloadURL, ref } from "firebase/storage"


const TweetForm = () => {
  // collection'ı referans alma
  const tweetsCol = collection(db, "tweets")

  // mediayı storage'a yükleme ve url'ini döndürme
  // resim yükleme adımları
  const uploadImage = async (image) => {
    // gönderilen dosyayı kontrol etme
    if(!image){
      return null;
    }
    // resmin storage'daki yerini ayarlama
    const storageRef = ref(storage, 
      `${new Date().getTime()}${image.name}`
    );
    // ayarlanan konuma resmi yükleme
    const url = await uploadBytes(storageRef, image)
    // yüklenme bittiğinde resmin url'ni al
    .then((res) => getDownloadURL(res.ref))
    .catch(() => toast.error("Görsel yüklenirken hata oluştu!"));

    // fonksiyonun çağırıldığı yere url gönderme
    return url;
  }

  // formun gönderilmesi
  const handleSubmit = async ( e) => {
    e.preventDefault();
    const textContent = e.target[0].value ;
    const imageContent = e.target[1].files[0]; 

    // resmi storage'a yükleyip url'ni alma
    const url = await uploadImage(imageContent)

    if(!textContent){
      toast.info("Tweet ekleyin");
      return;
    } 

    // tweeti firebase collection'a ekleme
    await addDoc(tweetsCol, {
      textContent,
      imageContent: url,
      createdAt: serverTimestamp(),
      user: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      likes: [],
    });

    // inputları sıfırlama
    e.target[0].value  = "";
    e.target[1].value = null;
  };

  return (
    <form 
    onSubmit={handleSubmit}
    className="flex gap-3 p-4 border-b-2 border-b-gray-800">
      <img className="rounded-full h-[50px]" src={auth.currentUser.photoURL}/>

      <div className="w-full">
        <input className="w-full bg-transparent my-2 outline-none placeholder:text-lg" placeholder="Neler Oluyor?" type="text" />

        <div className=" h-[45px] items-center flex justify-between">
          <div className="hover:bg-gray-800 transition p-4 cursor-pointer rounded-full">
            <label htmlFor="picture">
              <BsCardImage />
            </label>
            <input className="hidden" type="file" id="picture" />
          </div>
          <button className="bg-blue-600 px-4 py-2 rounded-full transition hover:bg-blue-500">Tweet</button>
        </div>
      </div>
    </form>
  )
}

export default TweetForm