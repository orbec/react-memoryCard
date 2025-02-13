import { useEffect, useState } from "react";
import Pokemon from "./Pokemon";
import "../styles/PokeList.css";

const mainUrl = "https://pokeapi.co/api/v2/pokemon?limit=250&offset=0";

export default function GetPokeList() {
  const [pokeList, setPokeList] = useState([]);
  const [pokeSet, setPokeSet] = useState(new Set());
  const [selected, setSelected] = useState(new Set());

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller.signal;
    fetch(mainUrl, { signal })
      .then((response) => response.json())
      .then((data) => {
        setPokeList(data.results);
      })
      .catch((error) => {
        if (!error.name !== "AbortError") {
          console.error(error);
        }
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (pokeList.length > 0) {
      const newPokeSet = new Set();
      while (newPokeSet.size < 20) {
        const randomPoke = Math.floor(Math.random() * pokeList.length);
        newPokeSet.add(pokeList[randomPoke]);
      }
      setPokeSet(newPokeSet);
    }
  }, [selected, pokeList]);

  const handleClick = (e) => {
    let newSet = new Set();
    if (!selected.has(e.target.id)) {
      newSet = new Set(selected);
    }
    newSet.add(e.target.id);
    setSelected(newSet);
  };

  return (
    <>
      {pokeSet.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div>
            Score: <span>{selected.size}</span>
          </div>
          <div className="pokeList">
            {Array.from(pokeSet).map((pokemon) => {
              return (
                <Pokemon
                  key={pokemon.name}
                  pokeName={pokemon.name}
                  url={pokemon.url}
                  click={handleClick}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
