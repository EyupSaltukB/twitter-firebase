import Aside from "../components/Aside"
import Main from "../components/Main"
import Nav from "../components/Nav"

const Feed = () => {
  return (
    <section className="grid grid-cols-4 xl:grid-cols-3 h-screen bg-black text-white overflow-hidden">
        <Nav/>
        <Main/>
        <Aside/>
    </section>
  )
}

export default Feed;