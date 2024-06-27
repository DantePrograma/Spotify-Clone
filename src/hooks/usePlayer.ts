import { useEffect, useRef, useCallback } from "react";
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

  // Reproducir o pausar la música según el estado de isPlaying
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          if (error.name !== "AbortError") {
            console.error("Error playing audio:", error);
          }
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Ajustar el volumen cuando cambie
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Cargar y reproducir la nueva canción cuando cambie currentMusic
  useEffect(() => {
    const { playList, song } = currentMusic;

    const handleCanPlayThrough = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.error("Error playing audio:", error);
        }
      }
    };

    if (song && audioRef.current) {
      const songSrc = `/music/${playList?.id}/${song.id}.mp3`;
      const audio = audioRef.current;

      audio.src = songSrc;
      audio.load();

      audio.addEventListener("canplaythrough", handleCanPlayThrough);

      return () => {
        if (audio) {
          audio.removeEventListener("canplaythrough", handleCanPlayThrough);
        }
      };
    }
  }, [currentMusic]);

  // Manejar el volumen silenciado
  const handleSilencedVolume = useCallback(() => {
    if (volume < 0.1) {
      setVolume(previousVolume.current);
    } else {
      previousVolume.current = volume;
      setVolume(0);
    }
  }, [volume, setVolume]);

  // Alternar la reproducción de música
  const handlePlay = useCallback(() => {
    if (currentMusic.playList) {
      setIsPlaying(!isPlaying);
    }
  }, [currentMusic.playList, isPlaying, setIsPlaying]);

  // Pasar a la siguiente canción
  const nextSong = useCallback(() => {
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
  }, [currentMusic, setCurrentMusic, setIsPlaying]);

  // Retroceder a la canción anterior
  const previousSong = useCallback(() => {
    if (currentMusic.playList) {
      const currentIndex = currentMusic.songs.findIndex(
        (song) => song.id === currentMusic.song?.id
      );
      const previousIndex =
        (currentIndex - 1 + currentMusic.songs.length) %
        currentMusic.songs.length;
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
  }, [currentMusic, setCurrentMusic, setIsPlaying]);

  // Añadir el evento de pasar a la siguiente canción cuando termine la actual
  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.addEventListener("ended", nextSong);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("ended", nextSong);
      }
    };
  }, [nextSong]);

  return {
    audioRef,
    handlePlay,
    handleSilencedVolume,
    nextSong,
    previousSong,
  };
};
