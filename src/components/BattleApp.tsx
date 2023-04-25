import { useEffect, useState } from "react";
import { Move } from "../app/interfaces/interfaces";
import { wait } from "../helpers/helpers";
import { useAIOpponent } from "../hooks/useAIOpponent";
import {
  charizard,
  lucario,
  venusaur,
  pikachu,
  blastoise,
  gengar,
  potion,
  superPotion,
} from "../pokemon/pokemonSeed";
import ActionChoice from "./ActionChoice";
import BattleAnnouncer from "./BattleAnnouncer";
import MoveChoice from "./MoveChoice";
import { useBattleSequence } from "./useBattleSequence";
import UserInfo from "./UserInfo";
import { Spring, useSpring } from "@react-spring/web";
import "./BattleApp.css";
import { Button, Card } from "@mui/material";
import {
  amber,
  blue,
  brown,
  deepOrange,
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
import { relative } from "path";
import gameBoy from "../images/Group1.png";

function BattleApp({ onGameEnd }) {
  const [playerPokemon, setPlayerPokemon] = useState(charizard);
  const [opponentPokemon, setOpponentPokemon] = useState(lucario);
  const [playerTeam, setPlayerTeam] = useState([
    charizard,
    blastoise,
    venusaur,
    lucario,
    pikachu,
    gengar,
  ]);
  const [opponentTeam, setOpponentTeam] = useState([
    lucario,
    venusaur,
    charizard,
    blastoise,
    pikachu,
    gengar,
  ]);
  const [playerBag, setPlayerBag] = useState([potion, superPotion]);
  const [sequence, setSequence] = useState({});
  const [action, setAction] = useState("default");
  const [runMessage, setRunMessage] = useState("");
  const {
    turn,
    inSequence,
    playerHealth,
    opponentHealth,
    playerAnimation,
    opponentAnimation,
    announcerMessage,
  } = useBattleSequence({
    sequence,
    playerPokemon,
    opponentPokemon,
    playerTeam,
    opponentTeam,
  });

  const aiChoice = useAIOpponent(turn, opponentPokemon);

  useEffect(() => {
    if (aiChoice && turn === 1 && !inSequence) {
      setSequence({ turn, move: aiChoice });
    }
  }, [turn, aiChoice, inSequence]);

  const handleFight = () => {
    setAction("fight");
  };
  const handleDefault = () => {
    setAction("default");
  };
  const handleRun = async () => {
    setRunMessage("You cant run...");
    await wait(1500);
    setRunMessage("");
  };
  const handleBag = () => {
    setAction("bag");
  };
  const handleItemChoice = (item) => {
    let move = { hitType: "useItem" };
    setSequence({ turn, move: move, item });
    setAction("fight");
  };

  const handleSwitchPokemon = () => {
    setAction("pokemon");
  };
  const handlePokemonChoice = (pokemon) => {
    setPlayerPokemon(pokemon);
    let move = { hitType: "switchPokemon" };
    setSequence({ turn, move: move, pokemon });

    setAction("default");
  };
  useEffect(() => {
    if (playerHealth === 0) {
      (async () => {
        await wait(1000);
        setPlayerTeam(
          playerTeam.filter((pokemon) => pokemon !== playerPokemon)
        );
        setPlayerPokemon(playerTeam[1]);
        let move = { hitType: "pokemonFainted" };
        setSequence({ turn, move: move });
        setAction("pokemon");
      })();
    }
  }, [playerHealth]);

  useEffect(() => {
    if (opponentHealth === 0) {
      (async () => {
        await wait(1000);
        setOpponentTeam(
          opponentTeam.filter((pokemon) => pokemon !== opponentPokemon)
        );
        setOpponentPokemon(opponentTeam[1]);
        let move = { hitType: "pokemonFainted" };
        setSequence({ turn: 0, move: move });
      })();
    }
  }, [opponentHealth]);

  //   useEffect(() => {
  //     if (playerHealth === 0 || opponentHealth === 0) {
  //       (async () => {
  //         await wait(1000);
  //         onGameEnd(playerHealth === 0 ? opponentPokemon : playerPokemon);
  //       })();
  //     }
  //   }, [playerHealth, opponentHealth, onGameEnd]);

  const handleMoveChoice = (move: Move) => {
    setSequence({ turn, move: move });
  };

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
    <div style={{ backgroundColor: "" }}>
      <div className="TestBox">
        <div className="TB1"></div>
        <div className="TB2"></div>
      </div>
      <br />
      <div>
        <UserInfo pokemon={opponentPokemon} currentHP={opponentHealth} />
        <div></div>
        <div
          style={{ position: "relative", left: "10%" }}
          className="opponentSprite"
        >
          <div className={opponentAnimation}>
            <img style={{ maxHeight: "80px" }} src={opponentPokemon.image} />
          </div>
        </div>
      </div>

      <div
        style={{ position: "relative", left: "-20%" }}
        className="playerSprite"
      >
        <div className={playerAnimation}>
          <img
            style={{ maxHeight: "100px", minHeight: "80px" }}
            src={playerPokemon.imageBack}
          />
        </div>
      </div>
      <div>
        <UserInfo pokemon={playerPokemon} currentHP={playerHealth} />
      </div>
      <Card
        style={{
          border: "solid 8px slategray",
          borderRadius: "5px",
          backgroundColor: "",
          width: "95%",
          display: "flex",
          justifyContent: "center",
          position: "relative",
          left: "2%",
        }}
      >
        <>
          {!inSequence && turn === 0 && action !== "pokemon" && (
            <div style={{ display: "flex" }}>
              <MoveChoice
                pokemon={playerPokemon}
                handleMoveChoice={handleMoveChoice}
                mode={action}
                runMessage={runMessage}
              />
              <ActionChoice
                mode={action}
                handleFight={handleFight}
                handleDefault={handleDefault}
                handleRun={handleRun}
                handleBag={handleBag}
                handleSwitchPokemon={handleSwitchPokemon}
              />
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              flexWrap: "wrap",
            }}
          >
            {action === "pokemon" &&
              playerTeam.map((pokemon) => (
                <div style={{ verticalAlign: "top" }}>
                  <div style={{ margin: "20px" }} key={pokemon.name}>
                    <Button
                      variant="contained"
                      style={{
                        height: "50px",
                        width: "200px",
                        backgroundColor: getColorByType(pokemon.type.type1),
                      }}
                      onClick={() => handlePokemonChoice(pokemon)}
                    >
                      {pokemon.name}
                      <img src={pokemon.image} style={{}}></img>
                    </Button>
                  </div>
                </div>
              ))}
          </div>
          {action === "bag" &&
            playerBag.map((item) => (
              <div style={{ verticalAlign: "top" }}>
                <div style={{ margin: "20px" }} key={item.name}>
                  <Button
                    variant="contained"
                    style={{
                      height: "50px",
                      width: "200px",
                    }}
                    onClick={() => handleItemChoice(item)}
                  >
                    {item.name}
                    <img src={item.image} style={{ height: "100px" }}></img>
                  </Button>
                </div>
              </div>
            ))}
          {action === "bag" && (
            <Button
              variant="contained"
              style={{
                height: "50px",
                width: "200px",
                top: "20px",
              }}
              onClick={handleDefault}
            >
              Return
            </Button>
          )}

          {inSequence && (
            <div>
              <BattleAnnouncer message={announcerMessage} />
            </div>
          )}
        </>
      </Card>
      <br></br>
      <div className="TestBox">
        <div className="TB1"></div>
        <div className="TB2"></div>
      </div>
      <br></br>
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            width: "50%",
            rowGap: "2px",
            columnGap: "2px",
          }}
        >
          <div className="TestBox5">Water Gun </div>
          <div className="TestBox6">Thunder Wave</div>
          <div className="TestBox7">Ember</div>
          <div className="TestBox8">Vine Whip</div>
        </div>
        <div
          style={{
            display: "flex",

            flexDirection: "row",
            flexWrap: "wrap",

            width: "50%",

            columnGap: "5px",
          }}
        >
          <div className="TestBox1">FIGHT</div>
          <div className="TestBox2">POKE</div>
          <div className="TestBox3">BAG</div>
          <div className="TestBox4">RUN</div>
        </div>
      </div>
      <img src={gameBoy} alt="gameboy" />
    </div>
  );
}

export default BattleApp;
