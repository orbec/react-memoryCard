export default async function Fetch() {
  const item = Math.floor(Math.random() * 1302);
  let pokemon;
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0"
    );
    const data = await response.json();
    pokemon = data.results[item];
  } catch (error) {
    console.log(error);
  }

  const url = pokemon.url;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.sprites.front_default);
  } catch (error) {
    console.log(error);
  }
}
