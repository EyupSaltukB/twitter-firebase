import { useEffect, useState } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,sendPasswordResetEmail, signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../firebase/config"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


const Auth = () => {
    const [signUp, setSignUp] = useState(true);
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [email,setEmail] = useState("")

    // aktif kullanıcı varsa anasayfaya yönlendir
    useEffect(() => {
        if(auth.currentUser){
            navigate("/feed")
        }
    }, [])

    // form gönderildiğinde
    const handleSubmit = (e) => {
        e.preventDefault();

        /* form değerleri -> mail ve şifre */
        const mail = e.target[0].value
        setEmail(mail)
        const pass = e.target[1].value
        /* console.log(mail , pass) */

        if (signUp) {
            // hesap oluştur
            createUserWithEmailAndPassword(auth, mail, pass)
                .then(() => {
                    navigate("/feed")
                    toast.success("Hesabınız oluşturuldu!")
                })
                .catch((err) => {
                    // console.dir(err)
                    toast.error(`Üzgünüz, bir hata oluştu! ${err.code}`)
                })
        } else {
            // giriş yap
            signInWithEmailAndPassword(auth, mail, pass)
                .then(() => {
                    navigate("/feed");
                    toast.success("Hesabınıza giriş yapıldı!")
                })
                .catch((err) => {
                    // giriş bilgileri yanlış ise hatayı state'e aktar
                    if (err.code === 'auth/invalid-credential') {
                        setIsError(true);
                    }
                    toast.error(`Üzgünüz, bir hata oluştu! ${err.code}`)
                })
        }
    }

    // şifre sıfırlama
    const handlePassReset = () => {
        sendPasswordResetEmail(auth, email)
        .then(() => toast.info("Mailinize sıfırlama e-postası gönderildi"))
        .catch()
    }

    // Google ile giriş yap
    const handleGoogle = () => {
        signInWithPopup(auth, googleProvider)
        .then(() => navigate("/feed"))
        toast.success("Google ile giriş yapıldı!")
    }
    return (
        <section className='h-screen bg-zinc-800 grid place-items-center'>
            <div className='bg-black text-white flex-col gap-10 py-16 px-32 rounded-lg'>

                <div className='flex justify-center'>
                    <img className='h-[60px]' src="/x-logo.png" alt="" />
                </div>

                <h1 className='text-center font-bold text-xl'>Twitter'a Giriş Yap</h1>

                <div 
                onClick={handleGoogle}
                className='flex bg-white items-center py-2 px-10 rounded-full cursor-pointer gap-2 hover:bg-gray-300 mt-4'>
                    <img className='h-[20px]' src="/google-logo.png" alt="" />
                    <span className='text-black'>Google İle {signUp ? "Kayıt Ol" : "Giriş Yap"}</span>
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col mt-3'>
                    <label>Email</label>
                    <input className='text-black mt-1 rounded p-1 shadow-lg' type="email" />
                    <label className='mt-2'>Şifre</label>
                    <input className='text-black mt-1 rounded p-1 shadow-lg' type="password" />
                    <button className='bg-white text-black rounded-full p-1 font-bold mt-10 transition hover:bg-gray-300'>{signUp ? "Kayıt Ol" : "Giriş Yap"}</button>

                    <p className='mt-5 text-center'>
                        <span className='text-gray-500 me-2'>{signUp ? "Hesabınız Var Mı?" : "Hesabınız Yok Mu?"}</span>
                        <span
                            onClick={() => setSignUp(!signUp)}
                            className='cursor-pointer text-blue-600'>{signUp ? "Giriş Yap" : "Kayıt Ol"}</span>
                    </p>
                    {/* hata varsa */}
                    {isError && !signUp && (<p onClick={handlePassReset} className="text-red-400 mt-4 text-center cursor-pointer">Şifreni mi unuttun?</p>)}
                </form>

            </div>
        </section>
    )
}

export default Auth