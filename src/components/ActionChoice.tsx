import { Button } from "@mui/material";
import { useState } from "react";
import BattleAnnouncer from "./BattleAnnouncer";

function ActionChoice({
  mode,
  handleFight,
  handleDefault,
  handleRun,
  handleSwitchPokemon,
  handleBag,
}) {
  return (
    <div>
      {(() => {
        switch (mode) {
          case "fight":
            return (
              <div>
                <div>
                  <BattleAnnouncer message={"Select a Move"} />
                </div>

                <div>
                  <Button onClick={handleDefault}>Return</Button>
                </div>
              </div>
            );
          case "default":
            return (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "16px",
                  width: "90%" /* Update this value */,
                  position: "relative",
                  left: "5%" /* Update this value */,
                  top: "15px",
                }}
              >
                <Button onClick={handleFight} variant="outlined" color="error">
                  Fight
                </Button>
                <Button onClick={handleBag} variant="outlined" color="primary">
                  Items/Bag
                </Button>
                <Button
                  onClick={handleSwitchPokemon}
                  variant="outlined"
                  color="success"
                >
                  Pokemon
                </Button>
                <Button onClick={handleRun} variant="outlined" color="warning">
                  Run
                </Button>
              </div>
            );

          default:
            return <p></p>;
        }
      })()}
    </div>
  );
}

export default ActionChoice;
