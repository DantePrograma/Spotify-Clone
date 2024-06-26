import { useEffect, useState } from "react";
import { Slider } from "./Slider";

const formatDuration = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const SongDuration = ({
  audio,
}: {
  audio: React.RefObject<HTMLAudioElement>;
}) => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audioElement = audio.current;

    if (audioElement)
      audioElement.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      if (audioElement)
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  });

  const handleTimeUpdate = () => {
    if (audio.current) setCurrentTime(audio.current.currentTime);
  };

  const duration = audio.current?.duration ?? 0;

  return (
    <div className="hidden md:flex items-center gap-2">
      <span className="text-white text-sm">{formatDuration(currentTime)} </span>
      <Slider
        min={0}
        max={duration}
        className="w-[150px] md:w-[300px] xl:w-[650px]"
        value={[currentTime]}
        onValueChange={(value) => {
          const [timeToSet] = value;
          if (audio.current) audio.current.currentTime = timeToSet;
        }}
      />
      <span className="text-white text-sm">
        {duration ? formatDuration(duration) : "0:00"}
      </span>
    </div>
  );
};
