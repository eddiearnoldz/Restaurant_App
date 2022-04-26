import { useEffect, useState } from "react";

function ListFunction() {
  let fetchedData = []
  let position = 0
  const [ restaurants, setRestaurants] = useState([])
  const [city, setCity] = useState("")
  const [location, setLocation] = useState("186338")
  const [offset, setOffset] = useState(0)

  const encodedParamsRestaurant = new URLSearchParams();
    encodedParamsRestaurant.append("language", "en_US");
    encodedParamsRestaurant.append("limit", "100");
    encodedParamsRestaurant.append("location_id", `${location}`);
    encodedParamsRestaurant.append("currency", "USD");
    encodedParamsRestaurant.append("offset", `${offset}`);

  const encodedParamsCity = new URLSearchParams();
    encodedParamsCity.append("q", `${city}`);
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
    fetchRestaurants();
  }, [location])


const fetchRestaurants = async () => {
  await fetch(urlRestaurant, optionsRestaurant)
  .then(res => res.json())
  .then((json) => {
    console.log(position)
    setRestaurants(json.results.data.slice({position},5))
  })
  .catch(err => console.error('error:' + err));
}

const fetchCity = async () => {
  await fetch(urlCity, optionsCity)
 .then(res => res.json())
 .then(json => {
    console.log(json);
    setLocation(json.results.data[0].result_object.location_id)})
 .catch(err => console.error('error:' + err));
} 

const nextFive = () => { 
  position += 5
  fetchRestaurants();
}

const findCheapest = () => {
 const cheapos =  restaurants.filter( rest => (rest.price_level === '$'))
 setRestaurants(cheapos)
 }

  return (
    <>
      { 
        restaurants.map(location => {
            return (
              <>
                <p>{location.name}</p>
                <p>{location.email}</p>
                <p>{location.price_level}</p>
              </>
            )
        })
      }
      <form>
        <label>Choose a City</label>
        <input type="text" name="city" value={city} onChange = {(e) => setCity(e.target.value)}/>
        <button onClick = {(e) => {
                    e.preventDefault();
                    fetchCity();
                    }
                } > Show Results
        </button>
      </form>
      <button onClick = {(e) => {
                    e.preventDefault();
                    nextFive()
                    }
                } > Next 5 Restaurants
        </button>
        <button onClick = {(e) => {
                    e.preventDefault();
                    findCheapest();
                    }
                } > Show Cheapest Restaurant
        </button>
    </> 
  )
}

export default ListFunction;


