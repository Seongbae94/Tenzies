import React from "react";

const Die = ({ value, DiceClickHandler, id, isheld }) => {
  const styles = {
    backgroundColor: isheld ? "#59E391" : "white",
  };

  return (
    <div
      className="die-face"
      style={styles}
      onClick={() => DiceClickHandler(id)}
    >
      <h2 className="die-num">{value}</h2>
    </div>
  );
};

export default Die;
