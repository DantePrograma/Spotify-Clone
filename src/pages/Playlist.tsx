import { useParams } from "react-router-dom";
import { playlists, songs } from "../lib/data";
import { ClockIcon } from "../icons/ClockIcon";
import { PlayCardButton } from "../components/CardPlayButton";
import { usePlayerStore } from "../store/playerStore";
import { PlayIcon } from "../icons/PlayIcon";
import { NavigationButtons } from "../components/NavigationButtons";

export const Playlist = () => {
  const { setCurrentMusic, setIsPlaying, currentMusic } = usePlayerStore(
    (state) => state
  );
  const { id } = useParams();

  if (!id) return <h1>Playlist not found</h1>;

  const playlist = playlists.find((playlist) => playlist.id === id);

  if (!playlist) return <h1>Playlist not found</h1>;

  const playlistSongs = songs.filter(
    (song) => song.albumId === playlist?.albumId
  );

  const playlistDuration = playlistSongs.reduce((totalDuration, song) => {
    const [minutes, seconds] = song.duration.split(":").map(Number);
    return totalDuration + minutes * 60 + seconds;
  }, 0);

  const formatDuration = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes} Min ${seconds.toString().padStart(2, "0")} sec`;
  };

  const handleSong = (songIndex: number) => {
    const currentSong = playlistSongs.find(
      (element) => element.id === songIndex
    );

    if (!currentSong) return;

    setCurrentMusic({
      playList: playlist,
      song: currentSong,
      songs: playlistSongs,
    });
    setIsPlaying(true);
  };

  return (
    <section className="scroll-bar h-full overflow-y-auto bg-[#121212] relative transition-all duration-1000 rounded-xl overflow-hidden">
      <div className="relative h-full z-10">
        <div className="pt-4 pl-2 md:pl-6">
          <NavigationButtons />
        </div>
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end md:flex-col md:items-center lg:flex-row lg:items-end p-2 md:p-6 mt-2">
          <picture className="flex items-center justify-center">
            <img
              className="hover:scale-105 shadow-lg aspect-square w-52 h-52 sm:h-40 sm:w-40 md:w-52 md:h-52 rounded-md"
              src={playlist?.cover}
              alt={`Cover for ${playlist?.title}`}
            />
          </picture>

          <div className="text-white flex flex-col gap-3">
            <p className="text-sm font-medium hidden sm:block">Album</p>

            <h1 className="text-xl md:text-4xl xl:text-5xl 2xl:text-7xl font-black">
              {playlist?.title}
            </h1>

            <div className="flex items-center gap-1 text-[12px] sm:text-sm">
              <p className="font-semibold">{playlist?.artists.join(", ")}</p>
              <p>{` • ${playlist?.year} • `}</p>
              <p>{`${playlistSongs.length} songs,`}</p>
              <p>{formatDuration(playlistDuration)}</p>
            </div>
          </div>
        </header>

        <article className="h-full text-white p-2 md:p-6 bg-[#121212]/20">
          <div className="mb-5 text-black">
            <PlayCardButton id={id} />
          </div>

          <table className="w-full">
            <thead>
              <tr className="h-7 border-b border-[#ffffff1a] text-slate-200">
                <th className="text-center w-[10%] lg:w-[4%]">
                  <p className="font-normal">#</p>
                </th>
                <th className="text-left">
                  <p className="font-normal text-sm">Title</p>
                </th>
                <th className="flex justify-end">
                  <ClockIcon />
                </th>
                <th className="w-[3%]"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-4"></tr>
              {playlistSongs.map((song, index) => (
                <tr
                  onClick={() => handleSong(index + 1)}
                  className="h-14 rounded-lg transition-all hover:bg-zinc-800 group"
                  key={song.id}
                >
                  <td className="text-center h-full rounded-tl-md rounded-bl-md">
                    <span className="group-hover:hidden">{index + 1}</span>
                    <div className="hidden group-hover:flex items-center justify-center">
                      <PlayIcon classes={"h-6 w-6"} />
                    </div>
                  </td>
                  <td>
                    <p
                      className={`truncate transition-all ${
                        currentMusic.song?.title === song.title &&
                        "text-[#1ed760]"
                      }`}
                    >
                      {song.title}
                    </p>
                    <p className="text-sm text-slate-400">
                      {song.artists.join(", ")}
                    </p>
                  </td>
                  <td className="text-right">
                    <p className="text-sm text-gray-400">{song.duration}</p>
                  </td>
                  <td className="w-[3%] rounded-tr-md rounded-br-md"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <div
          style={{ backgroundColor: playlist?.color }}
          className="absolute w-full h-[530px] transition-colors duration-700 ease-in-out inset-0 bg-gradient-to-t from-[#121212]  sm:from-base sm:via-base/80 -z-10"
        ></div>
      </div>
    </section>
  );
};
