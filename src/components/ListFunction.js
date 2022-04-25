import { useEffect, useState } from "react";

function ListFunction() {
  const [ restaurants, setRestaurants] = useState([])
  const [city, setCity] = useState("")
  const [location, setLocation] = useState("186338")
  const [offset, setOffset] = useState(0)
  let offsetNumber = 0
  console.log(city)
  const encodedParamsRestaurant = new URLSearchParams();
    encodedParamsRestaurant.append("language", "en_US");
    encodedParamsRestaurant.append("limit", "5");
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
    fetchRestaurants()
  }, [location])


const fetchRestaurants = async () => {
  await fetch(urlRestaurant, optionsRestaurant)
  .then(res => res.json())
  .then((json) => {console.log(json); setRestaurants(json.results.data)})
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
const nextFive = () =>{
  let newOffset = offset
  setOffset(newOffset += 5)
  fetchRestaurants();
  console.log(offsetNumber)
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
                    nextFive();
                    }
                } > Next 5 Restaurants
        </button>
    </> 
  )
}

export default ListFunction;


