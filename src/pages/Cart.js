import React, {useState, useEffect } from 'react'
import ListingList from '../components/ListingList';

export default function Cart({userId}) {
    const [listings, setListings] = useState([]);
    const [test, setTest] = useState(false);

    const deleteFromCart = (listingid, userId) => {
      fetch(
        'https://localhost:7057/api/Cart/deleteFromCart/'+ listingid + '/' + userId,
        {
          method: 'DELETE',
          headers: {
            'Access-Control-Allow-Origin': 'https://localhost:7283',
            'Content-Type': 'application/json',
          },
          body:""
        },
      )
      setTest((prev) => !prev)
    }

    useEffect(() =>{
      if(userId){
      console.log("useeffect for cart")
        fetch(
            'https://localhost:7057/api/Cart/' + userId,
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
    }, [test])

  return (
    <div>
        {listings.length > 0 ? <ListingList inCart={true} listings={listings} deleteFromCart={deleteFromCart} userId={userId}/> : <h3>Add Cars to your Cart</h3>}
    </div>
  )
}
