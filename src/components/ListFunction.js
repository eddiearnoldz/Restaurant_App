import { useEffect, useState } from "react";

function ListFunction() {

  const [ restaurants, setRestaurants] = useState()

  useEffect(() => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("language", "en_US");
    encodedParams.append("limit", "30");
    encodedParams.append("location_id", "297704");
    encodedParams.append("currency", "USD");
    
    const url = 'https://worldwide-restaurants.p.rapidapi.com/search';
    
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com',
        'X-RapidAPI-Key': '0791fd2251msh1059b7a80f03df0p1b3d34jsna52ad818afbc'
      },
      body: encodedParams
    };
    
    fetch(url, options)
      .then(res => res.json())
      .then((json) => {console.log(json); setRestaurants(json.results.data)})
      .catch(err => console.error('error:' + err));
    }, [])
console.log(restaurants)

  return (
    <>
      { 
        restaurants.map(location => {
            return (
              <>
                <p>{location.name}</p>
                <p>{location.email}</p>
              </>
            )
        })
      }
         <h1>Restaurants</h1>
    </>
       
    )
}

export default ListFunction;
