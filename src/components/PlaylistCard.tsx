import { Link } from "react-router-dom";
import { Playlist } from "../lib/data";
import { PlayCardButton } from "./CardPlayButton";
import { usePlayerStore } from "../store/playerStore";

interface PlaylistProps {
  playlist: Playlist;
}

export const PlaylistCard = ({ playlist }: PlaylistProps) => {
  const { id, title, cover, artists } = playlist;
  const { currentMusic, isPlaying } = usePlayerStore((state) => state);

  return (
    <article className="group relative">
      <Link
        to={`/playlist/${id}`}
        className="flex flex-col gap-2 p-2 rounded transition-all hover:bg-zinc-800"
      >
        <picture className="aspect-square ">
          <img
            className="rounded object-cover aspect-square h-full w-full"
            src={cover}
            alt={`Cover for ${title}`}
          />
        </picture>
        <div>
          <h2 className="text-white truncate">{title}</h2>

          <p className="text-slate-400 text-sm truncate">
            {artists.join(", ")}
          </p>
        </div>
      </Link>

      <div
        className={`hidden md:block ${
          currentMusic.playList?.id === id && isPlaying && "opacity-100"
        } absolute right-4 bottom-[75px] transition-all duration-300 opacity-0 group-hover:opacity-100`}
      >
        <PlayCardButton id={id} />
      </div>
    </article>
  );
};
