import { HappyFace } from "./HappyFace.tsx";
import { SignalErrorFace } from "./SignalErrorFace.tsx";
import { ThinkingFace } from "./ThinkingFace.tsx";

export enum CharacterMood {
  Idle = "idle",
  Thinking = "thinking",
  Happy = "happy",
  Celebrating = "celebrating",
  Error = "error",
}

export const CharacterFace: React.FC<{
  mood: CharacterMood;
  signalColor: string;
}> = ({ mood, signalColor }) => {
  if (mood === CharacterMood.Thinking)
    return <ThinkingFace signalColor={signalColor} />;
  if (mood === CharacterMood.Happy)
    return <HappyFace signalColor={signalColor} mood={mood} />;
  if (mood === CharacterMood.Celebrating)
    return <HappyFace signalColor={signalColor} mood={mood} />;
  if (mood === CharacterMood.Error) return <SignalErrorFace />;

  return <ThinkingFace signalColor={signalColor} />;
};
