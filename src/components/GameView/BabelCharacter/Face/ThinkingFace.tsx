interface ThinkingFaceProps {
  signalColor: string;
}

export const ThinkingFace: React.FC<ThinkingFaceProps> = ({ signalColor }) => {
  return (
    <div className="flex gap-1.5 items-end h-8">
      <div className={`w-2 bg-${signalColor}/60 animate-bounce h-4`}></div>
      <div
        className={`w-2 bg-${signalColor} animate-[bounce_1.2s_infinite] h-8`}
      ></div>
      <div
        className={`w-2 bg-${signalColor}/60 animate-[bounce_0.8s_infinite] h-6`}
      ></div>
      <div
        className={`w-2 bg-${signalColor} animate-[bounce_1.5s_infinite] h-5`}
      ></div>
    </div>
  );
};
