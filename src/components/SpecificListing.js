import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import '../styles/listing.css'

export default function SpecificListing({props}) {
    const [images, setImages] = useState([]);
    const [facts, setFacts] = useState([]);
    const {state} = useLocation();
    const {id, userId, type, maker, price, dateOfListing, favorites} = state.listing;

    useEffect(() => {
        fetch(
            'https://localhost:7057/api/Fact/' + id,
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
                setFacts(r);
            });
        }, [])
   //console.log(props.location.state.listing)
  return (
    <div>
        <div className="specificListing">
            {images.length > 0 ? <img className="singleImage" src={images[0].img}/> : <img className="singleImage" src={'https://tesla-cdn.thron.com/delivery/public/image/tesla/8bdb0faa-e77a-4072-aabd-0bb2e0a2454e/bvlatuR/std/1200x628/Model-Y-Social-Global?quality=auto-medium&format=auto'} />}
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
        <div className="facts">
        <div>
            <h2>electric?</h2>
        {facts.electric ? "YES" : "NO"}
        </div>
        <div>
            MPG : {facts.mpg}
        </div>
        </div>
    </div>
  )
}
