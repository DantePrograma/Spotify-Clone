import { PauseIcon } from "../icons/PauseIcon";
import { PlayIcon } from "../icons/PlayIcon";
import { usePlayerStore } from "../store/playerStore";
import { Slider } from "./Slider";
import {
  VolumeLow,
  VolumeMax,
  VolumeMedium,
  VolumeSilence,
} from "../icons/VolumeIcons";
import { SongDuration } from "./SongDuration";
import { Next } from "../icons/Next";
import { Previous } from "../icons/Previous";
import { usePlayer } from "../hooks/usePlayer";

export const Player = () => {
  const { audioRef, handlePlay, handleSilencedVolume, nextSong, previousSong } =
    usePlayer();
  const { isPlaying, currentMusic, volume, setVolume } = usePlayerStore(
    (state) => state
  );

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 h-full px-4 py-2">
      <article className="flex items-center gap-3">
        <picture>
          {currentMusic.song?.image && (
            <img
              className="h-[54px] w-[54px] aspect-square rounded"
              src={currentMusic.song?.image}
              alt={`cover for ${currentMusic.song?.title}`}
            />
          )}
        </picture>

        <div>
          <h1 className="text-white tracking-wide">
            {currentMusic.song?.title}
          </h1>
          <p className="text-slate-400 text-xs">
            {currentMusic.song?.artists.join(", ")}
          </p>
        </div>
      </article>

      <article className="flex flex-col items-end md:items-center justify-center gap-1">
        <div className="flex gap-5 text-slate-200 items-center">
          <button
            onClick={previousSong}
            className="hidden md:block cursor-pointer transition-all text-slate-300 hover:text-white"
          >
            <Previous />
          </button>
          <button
            className="text-black rounded-full h-9 w-9 flex items-center justify-center bg-green-50"
            onClick={handlePlay}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon classes={"h-7 w-7"} />}
          </button>

          <button
            onClick={nextSong}
            className="hidden md:block cursor-pointer transition-all text-slate-300 hover:text-white"
          >
            <Next />
          </button>

          <audio ref={audioRef}></audio>
        </div>

        <SongDuration audio={audioRef} />
      </article>

      <article className="hidden md:flex gap-1 items-center justify-end">
        <button onClick={handleSilencedVolume} className="text-white">
          {volume <= 0 ? (
            <VolumeSilence />
          ) : volume < 0.3 ? (
            <VolumeLow />
          ) : volume < 0.7 ? (
            <VolumeMedium />
          ) : (
            <VolumeMax />
          )}
        </button>
        <Slider
          defaultValue={[50]}
          max={100}
          min={0}
          className="w-[100px]"
          value={[volume * 100]}
          onValueChange={(volume) => {
            const [newVolume] = volume;
            const volumeToSet = newVolume / 100;
            setVolume(volumeToSet);
          }}
        />
      </article>
    </section>
  );
};
