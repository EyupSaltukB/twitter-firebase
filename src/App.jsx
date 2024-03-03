import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./pages/Auth"
import Feed from "./pages/Feed"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/config"
import { useNavigate } from "react-router-dom"

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    // aktif oturumdaki değişikliği izleme
    onAuthStateChanged(auth, (user) => {
      // oturum a.ıksa anasayfaya
      if (user) {
        navigate("/feed")
        // kapalıysa logine yönlendir
      } else {
        navigate("/")
      }
    })
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/feed" element={<Feed />} />
    </Routes>
  )
}

export default App
