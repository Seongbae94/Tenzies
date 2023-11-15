import { useEffect, useState } from "react";
import Die from "./components/Die";

function App() {
  const [randomDiceArr, setRandomDiceArr] = useState();
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

  return (
    <main>
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
      <button className="roll-dice" onClick={() => RollClickHandler()}>
        Roll
      </button>
    </main>
  );
}

export default App;
