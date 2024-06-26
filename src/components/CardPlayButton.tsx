import { PauseIcon } from "../icons/PauseIcon";
import { PlayIcon } from "../icons/PlayIcon";
import { GET } from "../pages/api/get-info-playlist.json";
import { usePlayerStore } from "../store/playerStore";

export const PlayCardButton = ({ id }: { id: string }) => {
  const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic } =
    usePlayerStore((state) => state);

  const isPlayingPlaylist = isPlaying && currentMusic.playList?.id === id;

  const songId = id ? id : "1";

  const handleClick = async () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }

    try {
      const response = await GET(songId);
      if (!response.ok) {
        throw new Error("Failed to fetch playlist");
      }
      const data = await response.json();

      const { playlist, allSongs } = data;

      setCurrentMusic({
        playList: playlist,
        song: allSongs[0],
        songs: allSongs,
      });
      setIsPlaying(true);
    } catch (error) {
      console.error("Error fetching playlist:", error);
    }
  };
  return (
    <button
      onClick={handleClick}
      className="hover:scale-105 z-50 rounded-full h-[54px] w-[54px] flex items-center justify-center bg-green-500"
    >
      {isPlayingPlaylist ? <PauseIcon /> : <PlayIcon classes={"h-8 w-8"} />}
    </button>
  );
};
