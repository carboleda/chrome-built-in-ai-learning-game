import "./BabelCharacter.css";
import { CharacterFace, type CharacterMood } from "./Face";

interface BabelCharacterProps {
  /** Animation state based on progress */
  mood: CharacterMood;
}

const getMoodMessage = (mood: CharacterMood) => {
  switch (mood) {
    case "thinking":
      return "Processing data packets...";
    case "happy":
      return "Signal routing successful! Keep going!";
    case "celebrating":
      return "System optimized! Module complete!";
    case "error":
      return "Error detected! Check your code and try again.";
    default:
      return "Hello! I'm Babel, your Signal-Bot assistant.";
  }
};

const getConfigForMood = (mood: CharacterMood) => {
  switch (mood) {
    case "thinking":
      return {
        screenColor: "[#0a0f14]",
        signalColor: "gray-500",
      };
    case "happy":
      return {
        screenColor: "[#0a0f14]",
        signalColor: "white",
      };
    case "celebrating":
      return {
        screenColor: "green-500",
        signalColor: "white",
      };
    case "error":
      return {
        screenColor: "[#0a0f14]",
        signalColor: "red-400",
      };
    default:
      return {
        screenColor: "[#0a0f14]",
        signalColor: "gray-500",
      };
  }
};

export const Character: React.FC<BabelCharacterProps> = ({ mood }) => {
  const { screenColor, signalColor } = getConfigForMood(mood);

  return (
    <div className="bg-background-dark font-display text-white overflow-hidden flex items-center justify-center">
      {/* Central Game Content */}
      <div className="inset-0 flex flex-col gap-10 items-center justify-center">
        {/* Babel the Signal-Bot */}
        <div className="relative group">
          {/* Bot Body */}
          <div className="relative w-36 h-48 flex flex-col items-center">
            {/* Floating Animation Wrapper */}
            <div className="relative flex flex-col items-center">
              {/* Antenna */}
              <div className="w-1 h-8 bg-[#344d65] -mb-1"></div>
              <div className="size-3 rounded-full bg-primary glow-primary animate-pulse"></div>
              {/* Head/Monitor */}
              <div className="w-40 h-32 bg-[#243647] border-4 border-[#344d65] rounded-xl flex items-center justify-center p-3 relative overflow-hidden shadow-2xl">
                {/* CRT Screen */}
                <div
                  className={`w-full h-full bg-${screenColor} rounded shadow-inner flex items-center justify-center relative`}
                >
                  <div className="crt-overlay absolute inset-0 rounded"></div>

                  <CharacterFace mood={mood} signalColor={signalColor} />
                </div>
              </div>
              {/* Bot Body/Chest */}
              <div className="w-24 h-12 bg-[#1a2632] border-x-4 border-b-4 border-[#344d65] rounded-b-3xl -mt-2 flex flex-col items-center pt-4">
                <div className="w-12 bg-border-muted rounded-full mb-2"></div>
                <div className="flex gap-2">
                  <div className="size-2 rounded-full bg-yellow-400/50"></div>
                  <div className="size-2 rounded-full bg-green-400/50"></div>
                </div>
              </div>
              {/* Repulsor Glow */}
              <div className="w-16 h-4 bg-primary/30 blur-lg mt-2 rounded-full"></div>
            </div>
          </div>
        </div>
        {/* Status Label */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 bg-background-dark/80 backdrop-blur px-4 py-1.5 rounded-full border border-primary/30">
            <span className="size-2 rounded-full bg-primary animate-ping"></span>
            <span
              className={`text-xs font-bold tracking-[0.2em] text-${signalColor} uppercase`}
            >
              {getMoodMessage(mood)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
