import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";

async function loadData() {
  const { data } = await getClient().query({
    query: gql`
      query {
        characters {
          results {
            id
            name
            status
            image
          }
        }
      }
    `,
  });

  return data.characters.results;
}

async function HomePage() {
  const characters = await loadData();

  return (
    <div className="grid grid-cols-3">
      {characters.map((character) => (
        <div key={character.id}>
          <img src={character.image} />
          <p>{character.name}</p>
          <p>{character.status}</p>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
