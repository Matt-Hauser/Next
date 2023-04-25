import { Pokemon, Move, StageMods } from "../app/interfaces/interfaces";

export const wait = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

interface AttackArg {
  attacker: Pokemon;
  defender: Pokemon;
  move: Move;
  attackerMods: StageMods;
  defenderMods: StageMods;
}
export const physicalAttk = ({
  attacker,
  defender,
  move,
  attackerMods,
  defenderMods,
}: AttackArg): number => {
  const statStages = {
    "-6": 2 / 8,
    "-5": 2 / 7,
    "-4": 2 / 6,
    "-3": 2 / 5,
    "-2": 2 / 4,
    "-1": 2 / 3,
    "0": 2 / 2,
    "1": 3 / 2,
    "2": 4 / 2,
    "3": 5 / 2,
    "4": 6 / 2,
    "5": 7 / 2,
    "6": 8 / 2,
  };

  const modifiedAttack = statStages[String(attackerMods.attack)];
  const modifiedDefense = statStages[String(defenderMods.defense)];
  const baseDmg =
    (((2 * attacker.stats.lvl) / 5 + 2) *
      move.power *
      ((attacker.stats.attack * modifiedAttack) /
        (defender.stats.defense * modifiedDefense))) /
      50 +
    2;

  const randomFactor = Math.floor(Math.random() * (255 - 217 + 1) + 217);
  const damage = Math.floor((baseDmg * randomFactor) / 255);

  return damage;
};

export const specialAttk = ({
  attacker,
  defender,
  move,
  attackerMods,
  defenderMods,
}: AttackArg) => {
  const statStages = {
    "-6": 2 / 8,
    "-5": 2 / 7,
    "-4": 2 / 6,
    "-3": 2 / 5,
    "-2": 2 / 4,
    "-1": 2 / 3,
    "0": 2 / 2,
    "1": 3 / 2,
    "2": 4 / 2,
    "3": 5 / 2,
    "4": 6 / 2,
    "5": 7 / 2,
    "6": 8 / 2,
  };

  const modifiedSpecialAttk = statStages[String(attackerMods.specialAttk)];
  const modifiedSpecialDef = statStages[String(defenderMods.specialDef)];
  const baseDmg =
    (((2 * attacker.stats.lvl) / 5 + 2) *
      move.power *
      ((attacker.stats.specialAttk * modifiedSpecialAttk) /
        (defender.stats.specialDef * modifiedSpecialDef))) /
      50 +
    2;

  const randomFactor = Math.floor(Math.random() * (255 - 217 + 1) + 217);
  const damage = Math.floor((baseDmg * randomFactor) / 255);

  return damage;
};

export function getTypeMultiplier(
  attacker: Pokemon,
  defender: Pokemon,
  move: Move
): number {
  // Define a mapping of type matchups and their effectiveness multipliers
  interface TypeMatchups {
    [type: string]: {
      [defendingType: string]: number;
    };
  }

  const typeMatchups: TypeMatchups = {
    normal: {
      normal: 1,
      fire: 1,
      water: 1,
      electric: 1,
      grass: 1,
      ice: 1,
      fighting: 1,
      poison: 1,
      ground: 1,
      flying: 1,
      psychic: 1,
      bug: 1,
      rock: 0.5,
      ghost: 0,
      dragon: 1,
      dark: 1,
      steel: 0.5,
      fairy: 1,
    },
    fire: {
      normal: 1,
      fire: 0.5,
      water: 0.5,
      electric: 1,
      grass: 2,
      ice: 2,
      fighting: 1,
      poison: 1,
      ground: 1,
      flying: 1,
      psychic: 1,
      bug: 2,
      rock: 0.5,
      ghost: 1,
      dragon: 0.5,
      dark: 1,
      steel: 2,
      fairy: 1,
    },
    water: {
      normal: 1,
      fire: 2,
      water: 0.5,
      electric: 1,
      grass: 0.5,
      ice: 1,
      fighting: 1,
      poison: 1,
      ground: 2,
      flying: 1,
      psychic: 1,
      bug: 1,
      rock: 2,
      ghost: 1,
      dragon: 0.5,
      dark: 1,
      steel: 1,
      fairy: 1,
    },
    electric: {
      normal: 1,
      fire: 1,
      water: 2,
      electric: 0.5,
      grass: 0.5,
      ice: 1,
      fighting: 1,
      poison: 1,
      ground: 0,
      flying: 2,
      psychic: 1,
      bug: 1,
      rock: 1,
      ghost: 1,
      dragon: 0.5,
      dark: 1,
      steel: 1,
      fairy: 1,
    },
    grass: {
      normal: 1,
      fire: 0.5,
      water: 2,
      electric: 0.5,
      grass: 0.5,
      ice: 1,
      fighting: 1,
      poison: 0.5,
      ground: 2,
      flying: 0.5,
      psychic: 1,
      bug: 0.5,
      rock: 2,
      ghost: 1,
      dragon: 0.5,
      dark: 1,
      steel: 0.5,
      fairy: 1,
    },
    ice: {
      normal: 1,
      fire: 0.5,
      water: 0.5,
      electric: 1,
      grass: 2,
      ice: 0.5,
      fighting: 2,
      poison: 1,
      ground: 2,
      flying: 2,
      psychic: 1,
      bug: 1,
      rock: 1,
      ghost: 1,
      dragon: 2,
      dark: 1,
      steel: 0.5,
      fairy: 1,
    },
    fighting: {
      normal: 2,
      fire: 1,
      water: 1,
      electric: 1,
      grass: 1,
      ice: 2,
      fighting: 1,
      poison: 0.5,
      ground: 1,
      flying: 0.5,
      psychic: 0.5,
      bug: 0.5,
      rock: 2,
      ghost: 0,
      dragon: 1,
      dark: 2,
      steel: 2,
      fairy: 0.5,
    },
    poison: {
      normal: 1,
      fire: 1,
      water: 1,
      electric: 1,
      grass: 2,
      ice: 1,
      fighting: 0.5,
      poison: 0.5,
      ground: 2,
      flying: 1,
      psychic: 2,
      bug: 1,
      rock: 0.5,
      ghost: 1,
      dragon: 1,
      dark: 1,
      steel: 0,
      fairy: 2,
    },
    ground: {
      normal: 1,
      fire: 2,
      water: 1,
      electric: 2,
      grass: 0.5,
      ice: 2,
      fighting: 1,
      poison: 0.5,
      ground: 1,
      flying: 0,
      psychic: 1,
      bug: 0.5,
      rock: 2,
      ghost: 1,
      dragon: 1,
      dark: 1,
      steel: 2,
      fairy: 1,
    },
    flying: {
      normal: 1,
      fire: 1,
      water: 1,
      electric: 0.5,
      grass: 2,
      ice: 1,
      fighting: 2,
      poison: 1,
      ground: 1,
      flying: 1,
      psychic: 1,
      bug: 2,
      rock: 0.5,
      ghost: 1,
      dragon: 1,
      dark: 1,
      steel: 0.5,
      fairy: 1,
    },
    psychic: {
      normal: 1,
      fire: 1,
      water: 1,
      electric: 1,
      grass: 1,
      ice: 1,
      fighting: 2,
      poison: 2,
      ground: 1,
      flying: 1,
      psychic: 0.5,
      bug: 2,
      rock: 1,
      ghost: 1,
      dragon: 1,
      dark: 0,
      steel: 0.5,
      fairy: 1,
    },
    bug: {
      normal: 1,
      fire: 0.5,
      water: 1,
      electric: 1,
      grass: 2,
      ice: 1,
      fighting: 0.5,
      poison: 1,
      ground: 0.5,
      flying: 0.5,
      psychic: 2,
      bug: 1,
      rock: 1,
      ghost: 0.5,
      dragon: 1,
      dark: 2,
      steel: 0.5,
      fairy: 1,
    },
    rock: {
      normal: 0.5,
      fire: 2,
      water: 1,
      electric: 1,
      grass: 1,
      ice: 2,
      fighting: 0.5,
      poison: 0.5,
      ground: 2,
      flying: 2,
      psychic: 1,
      bug: 2,
      rock: 1,
      ghost: 1,
      dragon: 1,
      dark: 1,
      steel: 0.5,
      fairy: 1,
    },
    ghost: {
      normal: 0,
      fire: 1,
      water: 1,
      electric: 1,
      grass: 1,
      ice: 1,
      fighting: 1,
      poison: 1,
      ground: 1,
      flying: 1,
      psychic: 2,
      bug: 1,
      rock: 1,
      ghost: 2,
      dragon: 1,
      dark: 0.5,
      steel: 1,
      fairy: 1,
    },
    dragon: {
      normal: 1,
      fire: 0.5,
      water: 0.5,
      electric: 0.5,
      grass: 0.5,
      ice: 2,
      fighting: 1,
      poison: 1,
      ground: 1,
      flying: 1,
      psychic: 1,
      bug: 1,
      rock: 1,
      ghost: 1,
      dragon: 2,
      dark: 1,
      steel: 0.5,
      fairy: 2,
    },
    dark: {
      normal: 1,
      fire: 1,
      water: 1,
      electric: 1,
      grass: 1,
      ice: 1,
      fighting: 0.5,
      poison: 1,
      ground: 1,
      flying: 1,
      psychic: 2,
      bug: 1,
      rock: 1,
      ghost: 2,
      dragon: 1,
      dark: 0.5,
      steel: 1,
      fairy: 0.5,
    },
    steel: {
      normal: 1,
      fighting: 2,
      flying: 1,
      poison: 1,
      ground: 1,
      rock: 2,
      bug: 1,
      ghost: 1,
      steel: 0.5,
      fire: 2,
      water: 1,
      grass: 0.5,
      electric: 1,
      psychic: 0.5,
      ice: 2,
      dragon: 1,
      dark: 1,
      fairy: 0.5,
    },
    fairy: {
      normal: 1,
      fighting: 0.5,
      flying: 1,
      poison: 2,
      ground: 1,
      rock: 1,
      bug: 0.5,
      ghost: 1,
      steel: 0.5,
      fire: 0.5,
      water: 1,
      grass: 1,
      electric: 1,
      psychic: 1,
      ice: 1,
      dragon: 2,
      dark: 0.5,
      fairy: 1,
    },
  };
  const moveType = move.type;
  const defenderType1 = defender.type.type1;
  const defenderType2 = defender.type.type2;
  console.log(moveType, defenderType1, defenderType2);
  let multiplier = 1;
  multiplier *= typeMatchups[moveType][defenderType1];
  console.log("type1X =", multiplier);
  if (defenderType2) {
    const secondTypeMultiplier = typeMatchups[moveType][defenderType2];
    multiplier *= secondTypeMultiplier;
    console.log("type2X =", secondTypeMultiplier);
  }

  // Loop through each of the defender's types and get the combined multiplier
  //   let multiplier = 1;
  //   for (const defenderType of defenderTurn.pokemonStats.type.userType) {
  //     const effectiveness = typeMatchups[attackerTurn.action.type][defenderType];
  //     multiplier *= effectiveness;
  //   }

  return multiplier;
}

export function rollCritChance(): number {
  // Generate a random number between 0 and 100
  const roll = Math.floor(Math.random() * 100);

  // Return 1.5 if the roll is less than or equal to 4.17, otherwise return 1
  return roll <= 4.17 ? 1.5 : 1;
}

export function getStabModifier(attacker, move): number {
  const moveType = move.type;
  const attackerType1 = attacker.type.type1;
  const attackerType2 = attacker.type.type2;

  if (attackerType1 === moveType || attackerType2 === moveType) {
    return 1.5;
  } else {
    return 1;
  }
}

export function calculateStageMods(move: Move): StageMods {
  const stageMods = {
    attack: 0,
    defense: 0,
    specialAttk: 0,
    specialDef: 0,
    speed: 0,
    evasion: 0,
    accuracy: 0,
  };

  if (move.stageMod) {
    move.stageMod.forEach((mod) => {
      switch (mod.name) {
        case "attack":
          stageMods.attack += mod.amount ?? 0;
          break;
        case "defense":
          stageMods.defense += mod.amount ?? 0;
          break;
        case "specialAttk":
          stageMods.specialAttk += mod.amount ?? 0;
          break;
        case "specialDef":
          stageMods.specialDef += mod.amount ?? 0;
          break;
        case "speed":
          stageMods.speed += mod.amount ?? 0;
          break;
        case "evasion":
          stageMods.evasion += mod.amount ?? 0;
          break;
        case "accuracy":
          stageMods.accuracy += mod.amount ?? 0;
          break;
        default:
          break;
      }
    });
  }

  return stageMods;
}
