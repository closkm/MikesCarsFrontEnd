import React, {useState, useEffect} from 'react'
import ListingList from '../components/ListingList'

export default function Main({userId}) {
    const [listings, setListings] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [fav, setFav] = useState(false);
    const [addedToCart, setAddedToCart] = useState(0);
    // const [userId, setUserId] = useState();
  console.log("in maine user id is " + userId)
  const addToCart = (listingId) => {

    //change 1 to userId once captured
    //safeguard this so u cant add items already in cart again
    //move me to cart for better logic
    fetch(
      'https://localhost:7057/api/Cart/addToCart/'+ listingId + '/' + userId,
      {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': 'https://localhost:7283',
          'Content-Type': 'application/json',
        },
        body:""
      },
    )
    setAddedToCart(prev => prev + 1);
  }

    useEffect(() => {
      if(userId){
        fetch(
          'https://localhost:7057/api/Listing/GetAvailableListings/' + userId,
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
          }
}, [addedToCart])



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
}, [fav])

const handleFav = () => {
  setFav(prev => !prev);
}

  return (
    <div>
      <div>
        <button onClick={() => handleFav()}>{fav ? "View All Listings" : "View Favorites"}</button>
      </div>
      <br/>
      <br/>
      <div>
        <ListingList listings={fav ? favorites : listings} userId={userId} addToCart={addToCart}/>
        </div>
    </div>
  )
}
