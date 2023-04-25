import { animated, Spring, useSpring } from "@react-spring/web";
import React from "react";

import "./HealthBar.css";

const HealthBar = ({ currentHP, originalHP }) => {
  const percentage = (currentHP / originalHP) * 100;
  const props = useSpring({ width: `${percentage}%`, from: { width: "0%" } });

  return (
    <div className="health-bar-container">
      <div className="health-bar">
        <animated.div className="health-bar-progress" style={props} />
      </div>
      <div className="health-bar-label">
        <span>
          {currentHP}/{originalHP}
        </span>
      </div>
    </div>
  );
};

export default HealthBar;
