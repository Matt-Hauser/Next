import { useEffect, useState } from "react";

export const useAIOpponent = (turn, opponentPokemon) => {
  const [aiChoice, setAIChoice] = useState(null);

  useEffect(() => {
    if (turn === 1) {
      const options = opponentPokemon.moves;
      setAIChoice(options[Math.floor(Math.random() * options.length)]);
    }
  }, [turn]);

  return aiChoice;
};
