import React from 'react'
import Listing from './Listing'
import '../styles/listing.css'

export default function ListingList( {listings, inCart, deleteFromCart, userId} ) {
  return (
    <div className="list">
        {listings.map(listing => <Listing key={listing.id} listing={listing} inCart={inCart} deleteFromCart={deleteFromCart} userId={userId}/>)}
    </div>
  )
}
