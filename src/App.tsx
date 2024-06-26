import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AsideMenu } from "./components/AsideMenu";
import { Home } from "./pages/Home";
import { Playlist } from "./pages/Playlist";
import { Player } from "./components/Player";

function App() {
  return (
    <BrowserRouter>
      <div className="layout h-screen w-screen md:p-2 font-roboto bg-black">
        <aside className="[grid-area:aside] hidden  md:flex overflow-y-auto">
          <AsideMenu />
        </aside>

        <main className="scroll-bar [grid-area:main] overflow-y-auto md:pl-2">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/playlist/:id" element={<Playlist />} />
          </Routes>
        </main>

        <footer className="[grid-area:player] bg-black">
          <Player />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
