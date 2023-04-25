import { useEffect, useState } from "react";

function PokeMainApp() {
  const [winner, setWinner] = useState();
  const [mode, setMode] = useState("start");

  useEffect(() => {
    if (mode === "battle") {
      setWinner(undefined);
    }
  }, [mode]);

  return (
    <div>
      {mode === "start" && (
        <MainScreen
          handleBattleClick={() => setMode("battle")}
          handleRosterClick={() => setMode("roster")}
        />
      )}
      {mode === "roster" && <Roster />}
      {mode === "battle" && (
        <BattleApp
          onGameEnd={(winner) => {
            setWinner(winner);
            setMode("gameOver");
          }}
        />
      )}
      {mode === "gameOver" && !!winner && <EndMenu />}
    </div>
  );
}

export default PokeMainApp;
