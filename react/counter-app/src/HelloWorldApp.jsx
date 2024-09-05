import { NameComponent } from "./NameComponent";
import { CounterApp } from "./CounterApp";

/// Esto es un objeto que contiene dos propiedades, en y es, que son strings
const message = {
  en: "Hello, World!",
  es: "¡Hola, Mundo!",
};

/// Esto es una función que recibe un string y retorna otro string
const getGreeting = (name) => {
  return `Hello, ${name}!`;
};

/// Esto es una función que recibe dos números y retorna la suma de ambos
const getResult = (a, b) => {
  return a + b;
};

export function HelloWorldApp() {
  return (
    <>
      {/*  */}
      <h1>
        {message.en}
        <small>{message.es}</small>
      </h1>
      <p>This is a React component.</p>

      {/* 
        Aquí se está llamando a la función getGreeting y se le está pasando el string "Manuel" como argumento.
        El resultado de la función getGreeting es un string que se renderiza en el DOM.
      */}
      <p>{getGreeting("Manuel")}</p>

      {/*
        Aquí se está llamando a la función getResult y se le están pasando los números 1 y 2 como argumentos.
      */}
      <p>{getResult(1, 2)}</p>

      <NameComponent name="Manuel" lastName="Duarte" age={23} />

      <CounterApp value={0} />
    </>
  );
}
