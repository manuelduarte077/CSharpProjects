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

    <div className="p-10">
      <div className="max-w-xl rounded overflow-hidden shadow-lg">
        {
          data.map((item) => {
            return (
              <div key={item.id}>
                <img className="w-full" src={item.image} alt={item.name} />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{item.name}</div>
                  <p className="text-gray-700 text-base">
                    {item.bio.alternativeNames}                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{item.bio.nationality}</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{item.bio.ethnicity}</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{item.bio.born}</span>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>

  )
}


