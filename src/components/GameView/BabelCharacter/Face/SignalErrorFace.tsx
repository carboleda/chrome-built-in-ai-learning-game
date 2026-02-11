export const SignalErrorFace: React.FC = () => {
  return (
    <div className="flex gap-2">
      <div className="size-2 rounded-full bg-red-500/30 animate-pulse"></div>
      <div className="size-2 rounded-full bg-red-500/60 animate-pulse delay-75"></div>
      <div className="size-2 rounded-full bg-red-500 animate-pulse delay-150"></div>
    </div>
  );
};
