"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";
import type { User, UserPokemon } from "@prisma/client";

export const listUsers = async () => {
  const users = await db.user.findMany();

  return users;
};

export const fetchUser = async (id: number): Promise<User | null> => {
  try {
    const user = await db.user.findFirst({
      where: { id },
    });
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
};

export const createUser = async (formData: FormData) => {
  // validate user input
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  // create user record in database
  const user = await db.user.create({
    data: {
      name,
      email,
    },
  });

  redirect(`/users/${user.id}`);
};

export const favoritePokemon = async (
  userId: number,
  pokemonName: string
): UserPokemon => {
  try {
    let favoritedPokemon;
    const existingRecord = await db.userPokemon.findFirst({
      where: { userId },
    });

    if (existingRecord) {
      favoritedPokemon = await db.userPokemon.update({
        where: { id: existingRecord.id },
        data: { pokemon: pokemonName },
      });
    } else {
      favoritedPokemon = await db.userPokemon.create({
        data: {
          userId,
          pokemon: pokemonName,
        },
      });
    }
    return favoritedPokemon;
  } catch (err) {
    console.error("failed to favorite pokemon:", err);
    throw new Error("Failed to favorite pokemon");
  }
};

export const fetchFavoritePokemon = async (
  userId: number
): Promise<UserPokemon | null> => {
  try {
    const user = await db.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    const favoritedPokemon = await db.userPokemon.findFirst({
      where: { userId },
    });
    return favoritedPokemon;
  } catch (error) {
    console.error("Failed to get user's favorite pokemon:", error);
    throw error;
  }
};

export interface Pokemon {
  name: string;
  url: string;
}

export const listPokemon = async (
  limit = 1500,
  offset = 0
): Promise<Pokemon[]> => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const pokemon = await response.json();
    return pokemon.results;
  } catch (error) {
    console.error("Failed to list pokemon:", error);
    return [];
  }
};

export interface PokemonDetails {
  name: string;
  sprites: {
    back_default?: string;
    back_shiny?: string;
    front_default?: string;
    front_shiny?: string;
  };
}

export const fetchPokemonDetails = async (
  pokemonName: string
): Promise<PokemonDetails | null> => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const data = await response.json();

    const pokemonDetails: PokemonDetails = {
      name: data.name,
      sprites: data.sprites,
    };

    return pokemonDetails;
  } catch (error) {
    console.error("Failed to fetch pokemon details:", error);
    return null;
  }
};
