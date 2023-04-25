import { Card } from "@mui/material";
import useGoogleFonts from "use-google-fonts";
import { useTypedMessage } from "../hooks/useTypedMessage";
import styles from "./styles.module.css";

const BattleAnnouncer = ({ message }) => {
  const typedMessage = useTypedMessage(message);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          margin: "25px",
          marginLeft: "20px",
          border: "3px solid slategray",
          backgroundColor: "",
          width: "215px",
          height: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontFamily: "",
            fontSize: "18px",
            color: "darkslategray",
            textShadow: "1px 1px 0 white",
          }}
        >
          {typedMessage}
        </div>
      </Card>
    </div>
  );
};

export default BattleAnnouncer;
