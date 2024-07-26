export const listUsers = async () => {
  console.log("get users and their selected pokemon");
};

export const getUser = async () => {
  console.log("get users and their selected pokemon");
};

export const createUser = async () => {};

export const listPokemon = async () => {
  // TODO: paginate results
  // TODO: error handling (try/catch)
  const limit = 100;
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
  );
  const data = await response.json();
  return data;
};

export const favoritePokemon = async () => {
  // this should be IDEMPOTENT!!!
};
