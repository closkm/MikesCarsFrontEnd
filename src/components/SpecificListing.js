import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import '../styles/listing.css'

export default function SpecificListing({props}) {
    const [images, setImages] = useState([]);
    const [facts, setFacts] = useState([]);
    const [loggedInUsersListing, setLoggedInUsersListing] = useState(false);
    const {state} = useLocation();
    const {id, type, maker, price, dateOfListing, favorites} = state.listing;
    const [displayNum, setDisplayNum] = useState(0);

    const history = useHistory();

    const navigateToListing = () => {
      history.push('/main')
    }

    const changeDisplayNum = () => {
        setDisplayNum(prev => {
            const nextNum = prev + 1;
            if(nextNum === images.length){
                return 0;
            }
            return nextNum;
        })
    }

    const handleDeleteListing = () => {
        fetch(
            'https://localhost:7057/api/Listing/DeleteListing/'+ id,
            {
              method: 'DELETE',
              headers: {
                'Access-Control-Allow-Origin': 'https://localhost:7283',
                'Content-Type': 'application/json',
              },
              body:""
            },
          )
        navigateToListing();
    }

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

    useEffect(() => {
        fetch(
            'https://localhost:7057/api/Listing/CheckIfUsersCar/' + state.userId + '/' + id,
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
                setLoggedInUsersListing(r);
            });
    }, [])

    useEffect(() => {
          fetch(
            'https://localhost:7057/api/Image/' + id,
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
   //console.log(props.location.state.listing)
  return (
    <div>
        <div className="specificListing">
            {images.length > 0 ? <img className="singleImage" src={images[displayNum].img}/> : <img className="singleImage" src={'https://tesla-cdn.thron.com/delivery/public/image/tesla/8bdb0faa-e77a-4072-aabd-0bb2e0a2454e/bvlatuR/std/1200x628/Model-Y-Social-Global?quality=auto-medium&format=auto'} />}
            <button className="changeDisplayNum" onClick={() => changeDisplayNum()}>Next Pic</button>
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
        {loggedInUsersListing ?
        <>
        <h1>THIS IS UR LISTING</h1>
        <button onClick={() => handleDeleteListing()}>Delete Listing</button>
        </> 
        : <h1>THIS IS NOT UR LISTING</h1>}
        </div>
    </div>
  )
}
