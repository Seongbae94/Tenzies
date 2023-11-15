import { useEffect, useState } from "react";
import Die from "./components/Die";
import Confetti from "react-confetti";

function App() {
  const [randomDiceArr, setRandomDiceArr] = useState();
  const [tenzies, setTenzies] = useState(false);
  const [count, setCount] = useState(0);

  const randomDiceNumber = () => {
    let generatedDiceArr = [];

    for (let i = 0; i < 10; i++) {
      generatedDiceArr.push({
        value: Math.ceil(Math.random() * 6),
        isheld: false,
        id: i + 1,
      });
    }

    setRandomDiceArr(generatedDiceArr);
  };

  const RollClickHandler = () => {
    setCount((prev) => prev + 1);
    setRandomDiceArr((prev) =>
      prev.map((dice) =>
        dice.isheld
          ? { ...dice }
          : { ...dice, value: Math.ceil(Math.random() * 6) }
      )
    );
  };

  const ReRollClickHandler = () => {
    randomDiceNumber();
    setTenzies(false);
    setCount(0);
  };

  const DiceClickHandler = (id) => {
    setRandomDiceArr((prev) =>
      prev.map((dice) =>
        dice.id === id ? { ...dice, isheld: !dice.isheld } : { ...dice }
      )
    );
  };

  useEffect(() => {
    randomDiceNumber();
  }, []);

  useEffect(() => {
    const allHeld = randomDiceArr && randomDiceArr.every((die) => die.isheld);
    if (allHeld) {
      const allSameNumber = randomDiceArr.reduce((a, c) => {
        if (a.value === c.value) {
          return a;
        } else {
          return false;
        }
      });

      if (!allSameNumber) {
        alert("All dice should be same");
      } else {
        setTenzies(true);
        alert("You Won!");
      }
    }
  }, [randomDiceArr]);

  return (
    <main>
      {tenzies && <Confetti />}
      <div className="count">Roll-count: {count}</div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">
        {randomDiceArr &&
          randomDiceArr.map((dice, index) => {
            return (
              <Die
                key={index}
                value={dice.value}
                id={dice.id}
                isheld={dice.isheld}
                DiceClickHandler={DiceClickHandler}
              />
            );
          })}
      </div>
      {tenzies && (
        <button className="roll-dice" onClick={() => ReRollClickHandler()}>
          New Game
        </button>
      )}
      {!tenzies && (
        <button className="roll-dice" onClick={() => RollClickHandler()}>
          Roll
        </button>
      )}
    </main>
  );
}

export default App;
