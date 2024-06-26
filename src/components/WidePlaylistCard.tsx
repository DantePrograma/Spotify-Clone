import { Link } from "react-router-dom";
import { Playlist } from "../lib/data";
import { PlayCardButton } from "./CardPlayButton";
import { usePlayerStore } from "../store/playerStore";

interface WidePlaylistProps {
  playlist: Playlist;
}

export const WidePlaylistCard = ({ playlist }: WidePlaylistProps) => {
  const { id, title, cover } = playlist;
  const { currentMusic, isPlaying } = usePlayerStore((state) => state);

  return (
    <article className="group relative">
      <Link
        to={`/playlist/${id}`}
        className="flex items-center gap-2 md:gap-5 transition-all bg-[#ffffff1a] hover:bg-neutral-500 rounded overflow-hidden"
        key={id}
      >
        <picture className="h-12 w-12 md:w-20 md:h-20">
          <img
            className="object-cover h-full w-full shadow-cardLarge"
            src={cover}
            alt={`Cover for ${title}`}
          />
        </picture>
        <div className="flex-1">
          <h3 className="text-white leading-5 text-xs font-semibold md:text-sm">
            {title}
          </h3>
        </div>

        <picture className="hidden md:block md:relative h-4 w-10 -left-2">
          <img
            className={`opacity-0 ${
              currentMusic.playList?.id === id && isPlaying && "opacity-100"
            }`}
            width="14"
            height="14"
            alt="equalizer icon"
            src="https://open.spotifycdn.com/cdn/images/equaliser-green.f8937a92.svg"
          />
        </picture>
      </Link>

      <div className="hidden md:block absolute right-4 bottom-[12px] translate-y-4 transition-all duration-300 opacity-0  group-hover:translate-y-0 group-hover:opacity-100">
        <PlayCardButton id={id} />
      </div>
    </article>
  );
};
