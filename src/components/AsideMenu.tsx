import { Link } from "react-router-dom";
import { HomeIcon } from "../icons/HomeIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { playlists } from "../lib/data";
import { PlaylistItem } from "./PlaylistItem";

export const AsideMenu = () => {
  return (
    <nav className="flex flex-col flex-1 gap-2">
      <div className="bg-[#121212] rounded-xl">
        <ul className="p-6 flex flex-col gap-6">
          <Link
            to="/"
            className="flex items-center gap-6 font-semibold hover:text-white transition-all text-slate-300"
          >
            <HomeIcon />
            Home
          </Link>
          <li className="flex items-center gap-6 font-semibold hover:text-white transition-all text-slate-300">
            <SearchIcon />
            Search
          </li>
        </ul>
      </div>

      <div className="bg-[#121212] rounded-xl h-full p-2">
        <ul className="flex flex-col gap-2">
          <a
            className="flex items-center p-4 gap-5 font-semibold hover:text-white transition-all text-slate-300"
            href="/"
          >
            <svg
              role="img"
              height="24"
              width="24"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
            </svg>
            Your Library
          </a>
          {playlists.map((playlist) => (
            <PlaylistItem key={playlist.id} playlist={playlist} />
          ))}
        </ul>
      </div>
    </nav>
  );
};
