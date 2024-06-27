import { useEffect, useRef } from "react";
import { usePlayerStore } from "../store/playerStore";

export const usePlayer = () => {
  const {
    isPlaying,
    setIsPlaying,
    currentMusic,
    setCurrentMusic,
    volume,
    setVolume,
  } = usePlayerStore((state) => state);
  const audioRef = useRef<HTMLAudioElement>(null);
  const previousVolume = useRef(volume);

  useEffect(() => {
    isPlaying ? audioRef.current?.play() : audioRef.current?.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const { playList, song } = currentMusic;

    if (song && audioRef.current) {
      const songSrc = `/music/${playList?.id}/${song.id}.mp3`;

      audioRef.current.src = songSrc;
      audioRef.current.addEventListener("canplaythrough", async () => {
        await audioRef.current!.play();
      });
    }
  }, [currentMusic]);

  const handleSilencedVolume = () => {
    if (volume < 0.1) {
      setVolume(previousVolume.current);
    } else {
      previousVolume.current = volume;
      setVolume(0);
    }
  };

  const handlePlay = () => {
    if (currentMusic.playList) setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    if (currentMusic.playList) {
      const currentIndex = currentMusic.songs.findIndex(
        (song) => song.id === currentMusic.song?.id
      );
      const nextIndex = (currentIndex + 1) % currentMusic.songs.length;
      const nextSong = currentMusic.songs[nextIndex];
      if (nextSong) {
        setCurrentMusic({
          playList: currentMusic.playList,
          song: nextSong,
          songs: currentMusic.songs,
        });
        setIsPlaying(true);
      }
    }
  };

  const previousSong = () => {
    if (currentMusic.playList) {
      const currentIndex = currentMusic.songs.findIndex(
        (song) => song.id === currentMusic.song?.id
      );
      const previousIndex = (currentIndex - 1) % currentMusic.songs.length;
      const previousSong = currentMusic.songs[previousIndex];
      if (previousSong) {
        setCurrentMusic({
          playList: currentMusic.playList,
          song: previousSong,
          songs: currentMusic.songs,
        });
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) audioElement.addEventListener("ended", nextSong);

    return () => {
      if (audioElement) audioElement.removeEventListener("ended", nextSong);
    };
  });

  return {
    audioRef,
    handlePlay,
    handleSilencedVolume,
    nextSong,
    previousSong,
  };
};
