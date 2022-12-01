import React, { useEffect, useState } from 'react'
import '../styles/listing.css'

function Listing({ listing, inCart, deleteFromCart, userId }) {
    const {type, price, maker, dateOfListing, favorites} = listing;
    const [images, setImages] = useState([])
    const [fav, setFav] = useState(false)

    const addToCart = () => {
      //change 1 to userId once captured
      //safeguard this so u cant add items already in cart again
      //move me to cart for better logic
      fetch(
        'https://localhost:7057/api/Cart/addToCart/'+ listing.id + '/' + userId,
        {
          method: 'POST',
          headers: {
            'Access-Control-Allow-Origin': 'https://localhost:7283',
            'Content-Type': 'application/json',
          },
          body:""
        },
      )
    }

    const addToFavs = () => {
      if(userId){
      fetch(
        'https://localhost:7057/api/Favorite/'+ userId + '/' + listing.id,
        {
          method: 'POST',
          headers: {
            'Access-Control-Allow-Origin': 'https://localhost:7283',
            'Content-Type': 'application/json',
          },
          body:""
        },
      )
      setFav(prev => !prev);
      }
    }

    const deleteFromFavs = () => {
      fetch(
        'https://localhost:7057/api/Favorite/DeleteFromFavorite/'+ userId + '/' + listing.id,
        {
          method: 'DELETE',
          headers: {
            'Access-Control-Allow-Origin': 'https://localhost:7283',
            'Content-Type': 'application/json',
          },
        },
      )
      setFav(prev => !prev);
    }

    useEffect(() => {
      if(userId && listing.id){
        fetch(
          'https://localhost:7057/api/Favorite/CheckIfFav/' + userId + '/' + listing.id,
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
              setFav(r);
            });  
          }
    }, [])

    useEffect(() => {
      console.log("in new use effect")
    }, [])

    console.log("listing user id is " + userId)
    return (
    <div className="listing">
        <div>
            {images.length > 0 && <img className="image" src={images[0].img}/>}
        </div>
        <div>
        {type}
        </div>
        <div>
        {maker}
        </div>
        <div>
        {price}
        </div>
        <div className="buttons">
          {!inCart ? <button onClick={() => addToCart()} className="addToCart">Add To Cart</button>
          : <button onClick={() => deleteFromCart(listing.id, userId)} className="addToCart">Delete From Cart</button>}
          {!fav ? <button onClick={() => addToFavs()} className="FavButton">Fav</button> : 
          <button onClick={() => deleteFromFavs()} className="FavButton">Delete From Fav</button>}
        </div>
    </div>
  )
}

export default Listing