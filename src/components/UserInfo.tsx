import { Spring, useSpring } from "@react-spring/web";
import HealthBar from "./HealthBar";

function UserInfo({ pokemon, currentHP }) {
  return (
    <div>
      <div>
        <HealthBar currentHP={currentHP} originalHP={pokemon.stats.hp} />
      </div>
      <div>{pokemon.name}</div>
      <div>{pokemon.lvl}</div>
    </div>
  );
}

export default UserInfo;
