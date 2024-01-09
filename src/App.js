import React from 'react';
import './style.css';
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

const getCharacter = async () => {
  const res = await fetch('https://rickandmortyapi.com/api/character');
  const json = await res.json();

  if (json.error) {
    throw new Error(json.error);
  }
  console.log(json);
  return json.results;
};

function CharacterList() {
  const query = useQuery({
    queryKey: ['characters'],
    queryFn: getCharacter,
  });

  return (
    <ul>
      {query.data?.map((character) => (
        <li key={character.id}>
          {character.name}
          <img src={character.image} />
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>Rick and MartY</h1>
        <CharacterList />
      </div>
    </QueryClientProvider>
  );
}
