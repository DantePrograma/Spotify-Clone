import { create } from "zustand";
import { Playlist, Song } from "../lib/data";

interface currentMusic {
  playList: Playlist | null;
  song: Song | null;
  songs: Song[];
}

export interface PlayerStore {
  isPlaying: boolean;
  volume: number;
  currentMusic: currentMusic;
  setIsPlaying: (isPlaying: boolean) => void;
  setVolume: (volume: number) => void;
  setCurrentMusic: (currentMusic: currentMusic) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  isPlaying: false,
  volume: 0.5,
  currentMusic: { playList: null, song: null, songs: [] },
  setVolume: (volume: number) => set({ volume }),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setCurrentMusic: (currentMusic: currentMusic) => set({ currentMusic }),
}));
