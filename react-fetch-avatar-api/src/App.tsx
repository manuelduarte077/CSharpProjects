import { useEffect, useState } from "react"

type avatarData = {
  id: number,
  name: string,
  image: string,
  bio: {
    alternativeNames: string[],
    ethnicity?: string,
    ages?: string,
    born?: string,
    died?: string,
    nationality?: string,
  },
}

export default function App() {

  const [data, setData] = useState<avatarData[]>([]);

  useEffect(() => {

    const api = async () => {
      const data = await fetch('https://api.sampleapis.com/avatar/characters', {
        method: 'GET',
      });

      const jsonData = await data.json();

      setData(jsonData);

    };

    api();

  }, [])

  return (
    <h1 className="text-3xl font-bold underline">
      {
        data.map((item) => {
          return (
            <div key={item.id}>
              <h1>{item.name}</h1>
              <img src={item.image} alt={item.name} />
              <p>{item.bio.alternativeNames}</p>
              <p>{item.bio.nationality}</p>
              <p>{item.bio.ethnicity}</p>

            </div>
          )
        })
      }
    </h1>
  )
}

