import React, {useState, useEffect} from 'react'
import ListingList from '../components/ListingList'

export default function Main({userId}) {
    const [listings, setListings] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [fav, setFav] = useState(false);
    // const [userId, setUserId] = useState();
  console.log("in maine user id is " + userId)
    useEffect(() => {
        fetch(
            'https://localhost:7057/api/Listing',
            {
              method: 'GET',
              headers: {
                'Access-Control-Allow-Origin': 'https://localhost:7057',
                'Content-Type': 'application/json',
              },
            },
          )
            .then((res) => res.json())
            .then((r) => {
              setListings(r);
            });
}, [])

useEffect(() => {
  if(userId){
  fetch(
    'https://localhost:7057/api/Favorite/GetUserFavorites/' + userId,
    {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': 'https://localhost:7057',
        'Content-Type': 'application/json',
      },
    },
  )
    .then((res) => res.json())
    .then((r) => {
      setFavorites(r);
    });
  }
}, [])

const handleFav = () => {
  setFav(prev => !prev);
}
//     useEffect(() => {
//       fetch(
//         'https://localhost:7057/api/User/' + firebaseId,
//         {
//           method: 'GET',
//           headers: {
//             'Access-Control-Allow-Origin': 'https://localhost:7057',
//             'Content-Type': 'application/json',
//           },
//         },
//       )
//         .then((res) => res.json())
//         .then((r) => {
//           setUserId(r.id);
//         });
// }, [])

  return (
    <div>
      <div>
        <button onClick={() => handleFav()}>{fav ? "View All Listings" : "View Favorites"}</button>
      </div>
      <br/>
      <br/>
      <div>
        <ListingList listings={fav ? favorites : listings} userId={userId}/>
        </div>
    </div>
  )
}
