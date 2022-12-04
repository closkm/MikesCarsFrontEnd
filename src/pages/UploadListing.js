import { preventOverflow } from '@popperjs/core';
import React, { useState } from 'react'
import {firebaseStorage} from '../utils/client';
import { storage, ref } from "firebase/storage";

export default function UploadListing({userId}) {
  const [maker, setMaker] = useState('Tesla');
  const [type, setType] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState('');
  const [images1, setImages1] = useState('')
  const [images2, setImages2] = useState('')
  const [images3, setImages3] = useState('')

  const [electric, setElectric] = useState(false);
  const [mpg, setMpg] = useState('');
  const [crashes, setCrashes] = useState('');
  const [miles, setMiles] = useState('');
  const [warranty, setWarranty] = useState(false);

  
  const dictionary = {
    "electric" : setElectric,
    "mpg" : setMpg,
    "crashes" : setCrashes,
    "miles" : setMiles,
    "warranty" : setWarranty,
    "maker" : setMaker,
    "type" : setType,
    "address" : setAddress,
    "price" : setPrice,
    "images1" : setImages1,
    "images2" : setImages2, 
    "images3" : setImages3
  } 

  const handleChange = (e) => {
    dictionary[e.target.id](e.target.value)
  }

  const sendRequest = (newListing) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
          'Access-Control-Allow-Origin': 'https://localhost:7057',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(newListing)
  }
  return fetch('https://localhost:7057/api/Listing/NewListing', fetchOptions)
  }

   const submit = (e) => {
    const dataToSend = {
      "userId" : userId,
      "type" : type,
      "maker" : maker,
      "address" : address,
      "price" : price,
      "dateOfListing": Date.now,
      "favorites": 0,
      "purchased": false,
      "inCart": false,
      "electric" : electric ? true : false,
        "listingId" : 0,
        "mpg" : mpg,
        "crashes" : crashes,
        "miles" : miles,
        "warranty" : warranty ? true : false,
        "images" : [images1,images2,images3]
    } 
     sendRequest(dataToSend);
    }

  return (
    <div>
      <h2>List your car for sale!!!</h2>
      <br/>
      <br/>
      <div className="sellForm">
        <form onSubmit={submit}>
          <h4>Please select your vehilce make</h4>
          <fieldset className="sellField">
            <select name="Maker" id="maker" onChange={handleChange}>
            <option name="radioCondition" className="sellinput" id="maker" value="Tesla" >Tesla</option>
            <option name="radioCondition" className="sellinput" id="maker" value="Mercedes" >Mercedes</option>
            <option name="radioCondition" className="sellinput" id="maker" value="Mazda" >Mazda</option>
            <option name="radioCondition" className="sellinput" id="maker" value="Ford" >Ford</option>
            </select>
          </fieldset>
          <fieldset className="sellField">
            <input className="sellinput" id="type" type="text" placeholder="Vehicle Type" onChange={handleChange} value={type} required />
          </fieldset>
          <fieldset className="sellField">
            <input className="sellinput" id="address" type="text" placeholder="Address" onChange={handleChange} value={address} required />
          </fieldset>
          <fieldset className="sellField">
            <input className="sellinput" id="price" type="number" placeholder="Selling Price" onChange={handleChange} value={price} required />
          </fieldset>
          

          
          <fieldset className="sellField">
            <input className="sellinput" id="mpg" type="number" placeholder="MPG" onChange={handleChange} value={mpg} required />
          </fieldset>
          <fieldset className="sellField">
            <input className="sellinput" id="crashes" type="number" placeholder="Number of Crashes" onChange={handleChange} value={crashes} required />
          </fieldset>
          <fieldset className="sellField">
            <input className="sellinput" id="miles" type="number" placeholder="Vehicle Miles" onChange={handleChange} value={miles} required />
          </fieldset>
          <fieldset className="sellField">
          <h5>Is your car still under warranty?</h5>
            <p><input name="warrantCondition" className="sellinput" id="warranty" type="radio" onChange={handleChange} value={true} required/>true</p>
            <p><input name="warrantCondition" className="sellinput" id="warranty" type="radio" onChange={handleChange} value={false} />false</p>
          </fieldset>
          <fieldset className="sellField">
            <h5>Is your car electric?</h5>
            <p><input name="radioCondition" className="sellinput" id="electric" type="radio" onChange={handleChange} value={true} required/>true</p>
            <p><input name="radioCondition" className="sellinput" id="electric" type="radio" onChange={handleChange} value={false} />false</p>
          </fieldset>

          <fieldset className="sellField">
            <input id="images1" className="sellinput" type="text" onChange={handleChange} value={images1} required />
            <input id="images2" className="sellinput" type="text" onChange={handleChange} value={images2} required />
            <input id="images3" className="sellinput" type="text" onChange={handleChange} value={images3} required />
          </fieldset>

          <button type="submit">Submit your listing!</button>
        </form>
      </div>
    </div>

  )
}
