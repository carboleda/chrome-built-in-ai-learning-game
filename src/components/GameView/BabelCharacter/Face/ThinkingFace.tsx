interface ThinkingFaceProps {
  signalColor: string;
}

export const ThinkingFace: React.FC<ThinkingFaceProps> = ({ signalColor }) => {
  return (
    <div className="flex gap-1.5 items-end h-8">
      <div
        className="w-2 h-4 animate-bounce"
        style={{ backgroundColor: `${signalColor}99` }}
      ></div>
      <div
        className="w-2 h-8 animate-[bounce_1.2s_infinite]"
        style={{ backgroundColor: signalColor }}
      ></div>
      <div
        className="w-2 h-6 animate-[bounce_0.8s_infinite]"
        style={{ backgroundColor: `${signalColor}99` }}
      ></div>
      <div
        className="w-2 h-5 animate-[bounce_1.5s_infinite]"
        style={{ backgroundColor: signalColor }}
      ></div>
    </div>
  );
};
