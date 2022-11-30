import React, { useEffect, useState } from 'react'
import '../styles/listing.css'

function Listing({ listing, inCart, deleteFromCart, userId }) {
    const {type, price, maker, dateOfListing, favorites} = listing;
    const [images, setImages] = useState([])
    const [test, setTest] = useState(false)

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
    }

    useEffect(() => {
      console.log("in useeffect")
        fetch(
            'https://localhost:7057/api/Image/' + listing.id,
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
              setImages(r);
            });  
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
          <button onClick={() => addToFavs()} className="FavButton">Fav</button>
        </div>
    </div>
  )
}

export default Listing