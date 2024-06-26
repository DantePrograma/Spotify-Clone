import { Greeting } from "../components/Greeting";
import { NavigationButtons } from "../components/NavigationButtons";
import { PlaylistCard } from "../components/PlaylistCard";
import { WidePlaylistCard } from "../components/WidePlaylistCard";
import { playlists } from "../lib/data";

export const Home = () => {
  return (
    <div className="relative transition-all duration-1000 rounded-xl bg-[#121212] overflow-hidden">
      <div className="relative z-10 p-2 pt-4 md:p-6">
        <div className="mb-3 md:mb-5">
          <NavigationButtons />
        </div>
        <Greeting />
        <ul className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-3 mb-10">
          {playlists.map((playlist) => (
            <WidePlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </ul>
        <div>
          <h1 className="text-2xl text-white font-semibold mb-2">
            Made for you
          </h1>

          <ul className="grid [grid-template-columns:repeat(auto-fill,minmax(150px,1fr))] md:[grid-template-columns:repeat(auto-fill,minmax(230px,1fr))] gap-1 -ml-2">
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </ul>
        </div>
        <div className="absolute w-full h-48 sm:h-[400px] bg-[#67fa69]/75 transition-colors duration-700 ease-in-out inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 sm:from-base sm:via-base/80 -z-10"></div>
      </div>
    </div>
  );
};
