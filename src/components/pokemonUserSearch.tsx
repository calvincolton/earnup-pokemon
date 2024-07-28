"use client";

import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import PokemonList from "./pokemonList";
import FavoritedPokemon from "./favoritedPokemon";
import { Pokemon, favoritePokemon, fetchFavoritePokemon } from "@/actions";
import { User, UserPokemon } from "@prisma/client";

interface PokemonUserSearchProps {
  pokemon: Pokemon[];
  user: User;
}

export default function PokemonUserSearch({
  pokemon,
  user,
}: PokemonUserSearchProps) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Pokemon | undefined>();
  const [favoritedPokemon, setFavoritedPokemon] = useState<UserPokemon | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      if (user.id) {
        try {
          const fetchedFavoritedPokemon = await fetchFavoritePokemon(user.id);
          setFavoritedPokemon(fetchedFavoritedPokemon);
        } catch (err: any) {
          setError(err.message);
        }
      }
    };

    if (user?.id) {
      fetchData();
    }
  }, [user?.id]);

  const handleClick = async () => {
    if (selected && selected.name) {
      const fetchedFavoritedPokemon = await favoritePokemon(
        user.id,
        selected?.name
      );
      setFavoritedPokemon(fetchedFavoritedPokemon);
    }
  };

  return (
    <>
      <FavoritedPokemon favoritedPokemon={favoritedPokemon} />
      <div className="mb-6 flex w-full md:w-1/2 mx-auto">
        <div className="w-full mr-4">
          <TextField
            type="text"
            name="search"
            placeholder="Search"
            variant="outlined"
            size="small"
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: "100%" }}
          />
        </div>
        {selected && (
          <Button
            variant="outlined"
            className="w-1/2 ml-2"
            onClick={handleClick}
          >
            <FavoriteIcon className="me-3" />
            {selected.name}
          </Button>
        )}
      </div>
      <PokemonList
        pokemon={filteredPokemon}
        search={search}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
}
