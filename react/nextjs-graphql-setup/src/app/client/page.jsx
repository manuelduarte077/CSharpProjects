"use client"

import {useSuspenseQuery} from "@apollo/experimental-nextjs-app-support/ssr"
import {gql} from "@apollo/client";

const query = gql`
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
`

function ClientPage() {

 const {data} = useSuspenseQuery(query)

 console.log(data)

  return (
    <div className="grid grid-cols-4">
        {data?.characters?.results.map((character) => (
          <div key={character.id}>
            <img src={character.image} alt={character.name} />
            {character.name} - {character.status}
          </div>
        ))}
    </div>
  )
}

export default ClientPage
