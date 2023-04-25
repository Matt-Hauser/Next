import { Pokemon } from "../app/interfaces/interfaces";
import { Move } from "../app/interfaces/interfaces";
import { Button } from "@mui/material";
import {
  amber,
  blue,
  brown,
  deepPurple,
  green,
  grey,
  indigo,
  lightBlue,
  lightGreen,
  orange,
  pink,
  purple,
  red,
  yellow,
} from "@mui/material/colors";
import BattleAnnouncer from "./BattleAnnouncer";
interface MoveChoiceArg {
  pokemon: Pokemon;
  handleMoveChoice: (move: Move) => void;
  mode: string;
  runMessage: string;
}

function MoveChoice({
  pokemon,
  handleMoveChoice,
  mode,
  runMessage,
}: MoveChoiceArg) {
  function getColorByType(type: string) {
    switch (type) {
      case "fire":
        return red[500];
      case "water":
        return blue[500];
      case "grass":
        return green[500];
      case "electric":
        return yellow[400];
      case "normal":
        return grey[500];
      case "fairy":
        return pink[300];
      case "fighting":
        return orange[900];
      case "flying":
        return lightBlue[500];
      case "steel":
        return grey[800];
      case "dark":
        return brown[500];
      case "bug":
        return lightGreen[600];
      case "psychic":
        return pink[500];
      case "poison":
        return purple[500];
      case "dragon":
        return deepPurple[500];
      case "ghost":
        return indigo[500];
      case "ice":
        return lightBlue[300];
      case "ground":
        return amber[500];
      case "rock":
        return amber[200];

      default:
        return grey[500];
    }
  }
  return (
    <div>
      {(() => {
        switch (mode) {
          case "fight":
            return (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "",
                  width: "100%" /* Update this value */,
                  position: "relative",
                  left: "10px",

                  top: "15px",
                  height: "20px",
                  marginRight: "0px",
                }}
              >
                {pokemon.moves.slice(0, 4).map((move: Move) => (
                  <Button
                    variant="outlined"
                    key={move.name}
                    onClick={() => handleMoveChoice(move)}
                    style={{
                      fontSize: "x-small",
                      color: getColorByType(move.type),
                      height: "65%",
                    }}
                  >
                    {move.name}
                  </Button>
                ))}
              </div>
            );
          case "default":
            let defaultMessage = `What will ${pokemon.name} do?`;
            return <BattleAnnouncer message={runMessage || defaultMessage} />;
          default:
            return <p></p>;
        }
      })()}
    </div>
  );
}
export default MoveChoice;
