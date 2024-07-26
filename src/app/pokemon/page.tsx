import { listPokemon } from "@/actions";

const ListPokemonPage = async () => {
  const { results: pokemon } = await listPokemon();
  console.log(pokemon);

  return (
    <div>
      <h2>Pokemon</h2>
      <ul>
        {Array.isArray(pokemon) &&
          pokemon.map((p) => <li key={p.url}>{p.name}</li>)}
        {/* {pokemon.map((p) => (
          <li key={p.name}>{p.name}</li>
        ))} */}
      </ul>
      {/* <div>
        <button onClick={handlePrevPage} disabled={!previous}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={!next}>
          Next
        </button>
      </div> */}
    </div>
  );
};

export default ListPokemonPage;
