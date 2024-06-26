import { Playlist } from "../lib/data";

interface PlaylistProps {
  playlist: Playlist;
}

export const PlaylistItem = ({ playlist }: PlaylistProps) => {
  const { id, title, cover, artists } = playlist;

  return (
    <a
      href={`/playlist/${id}`}
      className="flex items-center gap-3 transition-all hover:bg-zinc-500/15 rounded p-1"
    >
      <picture className="w-12 h-12">
        <img
          className="rounded aspect-square"
          src={cover}
          alt={`Cover for ${title}`}
        />
      </picture>

      <div className="flex flex-col">
        <h3 className="text-white truncate">{title}</h3>
        <p className="text-slate-400 text-xs">{artists.join(", ")}</p>
      </div>
    </a>
  );
};
