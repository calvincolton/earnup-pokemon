import { Button } from "@mui/material";

import { Pokemon } from "@/actions";

interface PokemonListProps {
  pokemon: Pokemon[];
  search: string;
  selected?: Pokemon;
  setSelected: (pokemon: Pokemon | undefined) => void;
}

export default function PokemonList({
  pokemon,
  search,
  selected,
  setSelected,
}: PokemonListProps) {
  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleOnChange = (p: Pokemon) => {
    if (selected && p.name === selected.name) {
      setSelected(undefined);
    } else {
      setSelected(p);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {filteredPokemon.map((p) => (
        <Button
          key={p.name}
          onClick={() => handleOnChange(p)}
          variant={`${selected?.name === p.name ? "contained" : "outlined"}`}
          className="capitalize p-4 text-center"
        >
          {p.name}
        </Button>
      ))}
    </div>
  );
}
