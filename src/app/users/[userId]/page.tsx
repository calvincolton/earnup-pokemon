import { fetchUser, fetchFavoritePokemon, listPokemon } from "@/actions";
import PokemonUserSearch from "@/components/pokemonUserSearch";

interface UserShowPageProps {
  params: { userId: string };
}

export default async function UserShowPage({ params }: UserShowPageProps) {
  const userId = parseInt(params.userId, 10);
  const user = await fetchUser(userId);
  const pokemon = await listPokemon();

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center">
        Save Your Favorite Pokemon
      </h2>
      <PokemonUserSearch user={user} pokemon={pokemon} />
    </div>
  );
}
