import { useState, useEffect } from "react";
import "../styles/Pokemon.css";
export default function Pokemon({ pokeName, url, click }) {
  const [pokemon, setPokemon] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller.signal;
    fetch(url, { signal })
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data.sprites.front_default);
      })
      .catch((error) => {
        if (!error.name !== "AbortError") {
          console.error(error);
        }
      });
    return () => controller.abort();
  });
  return (
    <button
      className="pokemon"
      onClick={click}
      id={pokeName}
      style={{ backgroundImage: `url(${pokemon})` }}
    >
      <span>{pokeName}</span>
    </button>
  );
}
