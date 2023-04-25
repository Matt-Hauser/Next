import { useState, useEffect } from "react";
import {
  calculateStageMods,
  getStabModifier,
  getTypeMultiplier,
  physicalAttk,
  rollCritChance,
  specialAttk,
  wait,
} from "../helpers/helpers";
import { Move, Pokemon } from "../app/interfaces/interfaces";

interface Sequence {
  move: Move;
  turn: number;
}
interface BattleSequenceArg {
  sequence: Sequence;
  playerPokemon: Pokemon;
  opponentPokemon: Pokemon;
  playerTeam?: Pokemon[];
  opponentTeam?: Pokemon[];
  item?: Item;
}
export const useBattleSequence = ({
  sequence,
  playerPokemon,
  opponentPokemon,
  playerTeam,
  opponentTeam,
  item,
}: BattleSequenceArg) => {
  const [turn, setTurn] = useState(0);
  const [inSequence, setInSequence] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(playerPokemon.refStats.hp);
  const [opponentHealth, setOpponentHealth] = useState(
    opponentPokemon.refStats.hp
  );
  const [playerStages, setPlayerStages] = useState({
    attack: 0,
    defense: 0,
    specialAttk: 0,
    specialDef: 0,
    speed: 0,
    evasion: 0,
    accuracy: 0,
  });
  const [opponentStages, setOpponentStages] = useState({
    attack: 0,
    defense: 0,
    specialAttk: 0,
    specialDef: 0,
    speed: 0,
    evasion: 0,
    accuracy: 0,
  });

  const [announcerMessage, setAnnouncerMessage] = useState("");
  const [playerAnimation, setPlayerAnimation] = useState("static");
  const [opponentAnimation, setOpponentAnimation] = useState("static");

  useEffect(() => {
    const { move, turn, item, pokemon } = sequence;

    if (move) {
      const attacker = turn === 0 ? playerPokemon : opponentPokemon;
      const defender = turn === 0 ? opponentPokemon : playerPokemon;
      const attackerMods = turn === 0 ? playerStages : opponentStages;
      const defenderMods = turn === 0 ? opponentStages : playerStages;

      switch (move.hitType) {
        case "physical": {
          const damage = physicalAttk({
            attacker,
            defender,
            move,
            attackerMods,
            defenderMods,
          });
          const typeMultiplier = getTypeMultiplier(attacker, defender, move);
          const critMultiplier = rollCritChance();
          const stabMultiplier = getStabModifier(attacker, move);
          const finalDamage = Math.floor(
            damage * typeMultiplier * critMultiplier * stabMultiplier
          );
          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.name} used ${move.name}`);

            await wait(1000);

            turn === 0
              ? setPlayerAnimation("physical")
              : setOpponentAnimation("physical");
            await wait(100);

            turn === 0
              ? setPlayerAnimation("static")
              : setOpponentAnimation("static");
            await wait(500);
            turn === 0 && critMultiplier > 1
              ? setAnnouncerMessage("A critical hit!")
              : {};
            await wait(300);
            turn === 0
              ? setOpponentAnimation("damage")
              : setPlayerAnimation("damage");
            await wait(750);
            turn === 0 && typeMultiplier > 1
              ? setAnnouncerMessage("It's super effective!")
              : {};
            turn === 0 && typeMultiplier < 1
              ? setAnnouncerMessage("It's not very effective...")
              : {};
            turn === 0
              ? setOpponentAnimation("static")
              : setPlayerAnimation("static");
            await wait(750);

            turn === 0
              ? setOpponentHealth((h) =>
                  h - finalDamage > 0 ? h - finalDamage : 0
                )
              : setPlayerHealth((h) =>
                  h - finalDamage > 0 ? h - finalDamage : 0
                );
            await wait(2000);

            if (opponentHealth !== 0) {
              setTurn(turn === 0 ? 1 : 0);
              setInSequence(false);
            } else {
              setTurn(0);
              setInSequence(false);
            }
          })();

          break;
        }
        case "special": {
          const damage = specialAttk({
            attacker,
            defender,
            move,
            attackerMods,
            defenderMods,
          });
          const typeMultiplier = getTypeMultiplier(attacker, defender, move);
          const critMultiplier = rollCritChance();
          const stabMultiplier = getStabModifier(attacker, move);
          const finalDamage = Math.floor(
            damage * typeMultiplier * critMultiplier * stabMultiplier
          );
          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.name} used ${move.name}`);

            await wait(1000);

            turn === 0
              ? setPlayerAnimation("special")
              : setOpponentAnimation("special");
            await wait(100);

            turn === 0
              ? setPlayerAnimation("static")
              : setOpponentAnimation("static");
            await wait(500);
            turn === 0 && critMultiplier > 1
              ? setAnnouncerMessage("A critical hit!")
              : {};
            turn === 0
              ? setOpponentAnimation("damage")
              : setPlayerAnimation("damage");
            await wait(750);

            turn === 0 && typeMultiplier > 1
              ? setAnnouncerMessage("It's super effective!")
              : {};
            turn === 0 && typeMultiplier < 1
              ? setAnnouncerMessage("It's not very effective...")
              : {};

            turn === 0
              ? setOpponentAnimation("static")
              : setPlayerAnimation("static");
            await wait(750);

            turn === 0
              ? setOpponentHealth((h) =>
                  h - finalDamage > 0 ? h - finalDamage : 0
                )
              : setPlayerHealth((h) =>
                  h - finalDamage > 0 ? h - finalDamage : 0
                );
            await wait(2000);

            if (opponentHealth !== 0) {
              setTurn(turn === 0 ? 1 : 0);
              setInSequence(false);
            } else {
              setInSequence(false);
            }
          })();
          break;
        }
        case "status-self": {
          const damage = 0;
          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.name} used ${move.name}`);

            await wait(1000);

            turn === 0
              ? setPlayerAnimation("status")
              : setOpponentAnimation("status");
            await wait(100);

            turn === 0
              ? setPlayerAnimation("static")
              : setOpponentAnimation("static");
            await wait(500);

            turn === 0
              ? setPlayerAnimation("damage")
              : setOpponentAnimation("damage");
            await wait(750);

            turn === 0
              ? setPlayerAnimation("static")
              : setOpponentAnimation("static");
            await wait(750);
            const change = calculateStageMods(move);
            turn === 0
              ? setPlayerStages({
                  attack:
                    change.attack + playerStages.attack < -6
                      ? -6
                      : change.attack + playerStages.attack > 6
                      ? 6
                      : change.attack + playerStages.attack,
                  defense:
                    change.defense + playerStages.defense < -6
                      ? -6
                      : change.defense + playerStages.defense > 6
                      ? 6
                      : change.defense + playerStages.defense,
                  specialAttk:
                    change.specialAttk + playerStages.specialAttk < -6
                      ? -6
                      : change.specialAttk + playerStages.specialAttk > 6
                      ? 6
                      : change.specialAttk + playerStages.specialAttk,
                  specialDef:
                    change.specialDef + playerStages.specialDef < -6
                      ? -6
                      : change.specialDef + playerStages.specialDef > 6
                      ? 6
                      : change.specialDef + playerStages.specialDef,
                  speed:
                    change.speed + playerStages.speed < -6
                      ? -6
                      : change.speed + playerStages.speed > 6
                      ? 6
                      : change.speed + playerStages.speed,
                  evasion:
                    change.evasion + playerStages.evasion < -6
                      ? -6
                      : change.evasion + playerStages.evasion > 6
                      ? 6
                      : change.evasion + playerStages.evasion,
                  accuracy:
                    change.accuracy + playerStages.accuracy < -6
                      ? -6
                      : change.accuracy + playerStages.accuracy > 6
                      ? 6
                      : change.accuracy + playerStages.accuracy,
                })
              : setOpponentStages({
                  attack:
                    change.attack + opponentStages.attack < -6
                      ? -6
                      : change.attack + opponentStages.attack > 6
                      ? 6
                      : change.attack + opponentStages.attack,
                  defense:
                    change.defense + opponentStages.defense < -6
                      ? -6
                      : change.defense + opponentStages.defense > 6
                      ? 6
                      : change.defense + opponentStages.defense,
                  specialAttk:
                    change.specialAttk + opponentStages.specialAttk < -6
                      ? -6
                      : change.specialAttk + opponentStages.specialAttk > 6
                      ? 6
                      : change.specialAttk + opponentStages.specialAttk,
                  specialDef:
                    change.specialDef + opponentStages.specialDef < -6
                      ? -6
                      : change.specialDef + opponentStages.specialDef > 6
                      ? 6
                      : change.specialDef + opponentStages.specialDef,
                  speed:
                    change.speed + opponentStages.speed < -6
                      ? -6
                      : change.speed + opponentStages.speed > 6
                      ? 6
                      : change.speed + opponentStages.speed,
                  evasion:
                    change.evasion + opponentStages.evasion < -6
                      ? -6
                      : change.evasion + opponentStages.evasion > 6
                      ? 6
                      : change.evasion + opponentStages.evasion,
                  accuracy:
                    change.accuracy + opponentStages.accuracy < -6
                      ? -6
                      : change.accuracy + opponentStages.accuracy > 6
                      ? 6
                      : change.accuracy + opponentStages.accuracy,
                });

            await wait(2000);
            if (opponentHealth !== 0) {
              setTurn(turn === 0 ? 1 : 0);
              setInSequence(false);
            } else {
              setInSequence(false);
            }
            setInSequence(false);
            setTurn(turn === 0 ? 1 : 0);
          })();
          break;
        }
        case "status-opponent": {
          const damage = 0;
          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.name} used ${move.name}`);

            await wait(1000);

            turn === 0
              ? setPlayerAnimation("status")
              : setOpponentAnimation("status");
            await wait(100);

            turn === 0
              ? setPlayerAnimation("static")
              : setOpponentAnimation("static");
            await wait(500);

            turn === 0
              ? setOpponentAnimation("damage")
              : setPlayerAnimation("damage");
            await wait(750);

            turn === 0
              ? setOpponentAnimation("static")
              : setPlayerAnimation("static");
            await wait(750);

            turn === 0;
            const change = calculateStageMods(move);
            turn === 0
              ? setOpponentStages({
                  attack:
                    change.attack + opponentStages.attack < -6
                      ? -6
                      : change.attack + opponentStages.attack > 6
                      ? 6
                      : change.attack + opponentStages.attack,
                  defense:
                    change.defense + opponentStages.defense < -6
                      ? -6
                      : change.defense + opponentStages.defense > 6
                      ? 6
                      : change.defense + opponentStages.defense,
                  specialAttk:
                    change.specialAttk + opponentStages.specialAttk < -6
                      ? -6
                      : change.specialAttk + opponentStages.specialAttk > 6
                      ? 6
                      : change.specialAttk + opponentStages.specialAttk,
                  specialDef:
                    change.specialDef + opponentStages.specialDef < -6
                      ? -6
                      : change.specialDef + opponentStages.specialDef > 6
                      ? 6
                      : change.specialDef + opponentStages.specialDef,
                  speed:
                    change.speed + opponentStages.speed < -6
                      ? -6
                      : change.speed + opponentStages.speed > 6
                      ? 6
                      : change.speed + opponentStages.speed,
                  evasion:
                    change.evasion + opponentStages.evasion < -6
                      ? -6
                      : change.evasion + opponentStages.evasion > 6
                      ? 6
                      : change.evasion + opponentStages.evasion,
                  accuracy:
                    change.accuracy + opponentStages.accuracy < -6
                      ? -6
                      : change.accuracy + opponentStages.accuracy > 6
                      ? 6
                      : change.accuracy + opponentStages.accuracy,
                })
              : setPlayerStages({
                  attack:
                    change.attack + playerStages.attack < -6
                      ? -6
                      : change.attack + playerStages.attack > 6
                      ? 6
                      : change.attack + playerStages.attack,
                  defense:
                    change.defense + playerStages.defense < -6
                      ? -6
                      : change.defense + playerStages.defense > 6
                      ? 6
                      : change.defense + playerStages.defense,
                  specialAttk:
                    change.specialAttk + playerStages.specialAttk < -6
                      ? -6
                      : change.specialAttk + playerStages.specialAttk > 6
                      ? 6
                      : change.specialAttk + playerStages.specialAttk,
                  specialDef:
                    change.specialDef + playerStages.specialDef < -6
                      ? -6
                      : change.specialDef + playerStages.specialDef > 6
                      ? 6
                      : change.specialDef + playerStages.specialDef,
                  speed:
                    change.speed + playerStages.speed < -6
                      ? -6
                      : change.speed + playerStages.speed > 6
                      ? 6
                      : change.speed + playerStages.speed,
                  evasion:
                    change.evasion + playerStages.evasion < -6
                      ? -6
                      : change.evasion + playerStages.evasion > 6
                      ? 6
                      : change.evasion + playerStages.evasion,
                  accuracy:
                    change.accuracy + playerStages.accuracy < -6
                      ? -6
                      : change.accuracy + playerStages.accuracy > 6
                      ? 6
                      : change.accuracy + playerStages.accuracy,
                });
            await wait(2000);
            setInSequence(false);
            setTurn(turn === 0 ? 1 : 0);
          })();
          break;
        }
        case "pokemonFainted":
          setInSequence(false);
          playerHealth === 0
            ? setPlayerHealth(playerTeam[0].stats.hp)
            : setOpponentHealth(opponentTeam[0].stats.hp);
          playerHealth === 0
            ? setPlayerStages(playerTeam[0].stageMods)
            : setOpponentStages(opponentTeam[0].stageMods);
          setTurn(0);
          break;
        case "useItem":
          setInSequence(true);
          if (item.type === "heal")
            setPlayerHealth(
              item.value + playerHealth > playerPokemon.stats.hp
                ? playerPokemon.stats.hp
                : item.value + playerHealth
            );
          (async () => {
            setAnnouncerMessage(
              `Player used ${item.name} on ${playerPokemon.name}`
            );
            await wait(2000);
            setTurn(1);
            setInSequence(false);
          })();

          break;

        case "switchPokemon":
          setPlayerHealth(pokemon.stats.hp);
          setPlayerStages({
            attack: 0,
            defense: 0,
            specialAttk: 0,
            specialDef: 0,
            speed: 0,
            evasion: 0,
            accuracy: 0,
          });

          break;
        default:
          break;
      }
    }
  }, [sequence]);
  return {
    turn,
    inSequence,
    playerHealth,
    opponentHealth,
    playerAnimation,
    opponentAnimation,
    announcerMessage,
  };
};
