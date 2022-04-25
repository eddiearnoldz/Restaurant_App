import { useEffect, useState } from "react";

function ListFunction() {
  const [ restaurants, setRestaurants] = useState([])
  const [city, setCity] = useState("")
  const encodedParamsRestaurant = new URLSearchParams();
    encodedParamsRestaurant.append("language", "en_US");
    encodedParamsRestaurant.append("limit", "5");
    encodedParamsRestaurant.append("location_id", "297704");
    encodedParamsRestaurant.append("currency", "USD");

  const encodedParamsCity = new URLSearchParams();
    encodedParamsCity.append("q", "lon");
    encodedParamsCity.append("language", "en_US");
    
    const urlRestaurant = 'https://worldwide-restaurants.p.rapidapi.com/search';
    const urlCity = 'https://worldwide-restaurants.p.rapidapi.com/typeahead';
    
    const optionsRestaurant = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com',
        'X-RapidAPI-Key': '0791fd2251msh1059b7a80f03df0p1b3d34jsna52ad818afbc'
      },
      body: encodedParamsRestaurant
    };

    const optionsCity = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com',
        'X-RapidAPI-Key': '0791fd2251msh1059b7a80f03df0p1b3d34jsna52ad818afbc'
      },
      body: encodedParamsCity
    };
    
    

  useEffect(() => {
    fetchRestaurants()
  }, [])


const fetchRestaurants = async () => {
  await fetch(urlRestaurant, optionsRestaurant)
  .then(res => res.json())
  .then((json) => {console.log(json); setRestaurants(json.results.data)})
  .catch(err => console.error('error:' + err));
}

const fetchCity = async () => {
  await fetch(urlCity, optionsCity)
 .then(res => res.json())
 .then(json => console.log(json))
 .catch(err => console.error('error:' + err));
} 


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
      <form>
        <input type="text" name="city" value={city} onChange = {(e) => setCity(e.target.value)}/>
        <button onClick = {(e) => {
                    e.preventDefault();
                    fetchCity();
                    }
                } > 
        </button>
      </form>
    </>
       
    )
}

export default ListFunction;


