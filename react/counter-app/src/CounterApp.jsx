import { useState } from "react";
import PropTypes from "prop-types";

export const CounterApp = ({ value }) => {
  const [counter, setCounter] = useState(0);

  function handleIncrement() {
    value = counter + 1;

    setCounter(value);
  }

  function handleDecrement() {
    value = counter - 1;

    setCounter(value);
  }

  function handleReset() {
    value = 0;

    setCounter(value);
  }

  return (
    <>
      <h1>CounterApp</h1>
      <h2>{counter}</h2>
      <button onClick={handleIncrement}>+1</button>
      <button onClick={handleDecrement}>-1</button>
      <button onClick={handleReset}>Reset</button>
    </>
  );
};

CounterApp.propTypes = {
  value: PropTypes.number.isRequired,
};
