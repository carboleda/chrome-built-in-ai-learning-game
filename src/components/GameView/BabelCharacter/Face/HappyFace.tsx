import { CharacterMood } from ".";

interface HappyFaceProps {
  signalColor: string;
  mood: CharacterMood;
}

export const HappyFace: React.FC<HappyFaceProps> = ({ signalColor, mood }) => {
  const smileStyle =
    mood === CharacterMood.Celebrating
      ? { borderColor: signalColor, borderBottomWidth: "4px" }
      : {
          backgroundColor: signalColor,
          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        };

  return (
    <div className="flex flex-col items-center gap-2 mt-2">
      <div className="flex gap-6">
        <div
          className="size-3 rounded-full shadow-[0_0_8px_white]"
          style={{ backgroundColor: signalColor }}
        ></div>
        <div
          className="size-3 rounded-full shadow-[0_0_8px_white]"
          style={{ backgroundColor: signalColor }}
        ></div>
      </div>
      <div className="w-12 h-6 rounded-full mt-1" style={smileStyle}></div>
    </div>
  );
};
