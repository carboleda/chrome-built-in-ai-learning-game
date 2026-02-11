import { CharacterMood } from ".";

interface HappyFaceProps {
  signalColor: string;
  mood: CharacterMood;
}

export const HappyFace: React.FC<HappyFaceProps> = ({ signalColor, mood }) => {
  const smileType =
    mood === CharacterMood.Celebrating
      ? `border-${signalColor}`
      : `bg-${signalColor}`;

  return (
    <div className="flex flex-col items-center gap-2 mt-2">
      <div className="flex gap-6">
        <div
          className={`size-3 rounded-full bg-${signalColor} shadow-[0_0_8px_white]`}
        ></div>
        <div
          className={`size-3 rounded-full bg-${signalColor} shadow-[0_0_8px_white]`}
        ></div>
      </div>
      <div
        className={`w-12 h-6 border-b-4 ${smileType} rounded-full mt-1`}
      ></div>
    </div>
  );
};
