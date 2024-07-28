"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { PokemonDetails, fetchPokemonDetails } from "@/actions";
import { UserPokemon } from "@prisma/client";

export default function FavoritedPokemon({ favoritedPokemon }: UserPokemon) {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (favoritedPokemon.pokemon) {
        try {
          const details = await fetchPokemonDetails(favoritedPokemon.pokemon);
          setPokemonDetails(details);
        } catch (err: any) {
          setError(err.message);
        }
      }
    };

    if (favoritedPokemon?.pokemon) {
      fetchData();
    }
  }, [favoritedPokemon?.pokemon]);

  if (!favoritedPokemon) return null;
  if (error) return null;
  if (!pokemonDetails) return null;

  return (
    <div className="flex flex-col items-center justify-center">
      <h3>Your current favorite pokemon is:</h3>
      <h4 className="text-xl capitalize font-bold">{pokemonDetails.name}</h4>
      <Image
        src={pokemonDetails.sprites.front_default || "/fallback.png"}
        alt={pokemonDetails.name}
        width={200}
        height={200}
      />
    </div>
  );
}
