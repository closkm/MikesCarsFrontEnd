import { preventOverflow } from '@popperjs/core';
import React, { useState } from 'react'

export default function UploadListing({userId}) {
  const [maker, setMaker] = useState('Tesla');
  const [type, setType] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const currentImages = [];
  
  const dictionary = {
    "maker" : setMaker,
    "type" : setType,
    "address" : setAddress,
    "price" : setPrice
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

  const sendImageRequest = (newListing) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
          'Access-Control-Allow-Origin': 'https://localhost:7057',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(newListing)
  }
  return fetch('https://localhost:7057/api/Image', fetchOptions)
  }




  const submit = (e) => {
    e.preventDefault();
    console.log("in on submit")
    const dataToSend = {
      "userId" : userId,
      "type" : type,
      "maker" : maker,
      "address" : address,
      "price" : price,
      "dateOfListing": Date.now,
      "favorites": 0,
      "purchased": false,
      "inCart": false
    } 
      sendRequest(dataToSend);
      console.log(currentImages)
      setImages(currentImages);
      console.log(images)

    //   let form = new FormData();
    //   for (let index = 0; index < e.target.files; index++) {
    //     let element = e.target.files[index];
    //     form.append('file', element);
    // }

      for(const image of currentImages){
       // form.append('img', image)
        const imageToSend = {
          "listingId" : 1008,
          "displayOrder": 1,
          "img" : image
        }
        sendImageRequest(imageToSend);
      }
    }
  
  const handleUploadFiles = files => {
    const uploaded = [...images]
    files.some((file) => {
      uploaded.push(file);
    })
    setImages(uploaded);
  }

  const handlePicture = (e) => {
    console.log("handlepic")

    //const chosenImages = Array.prototype.slice.call(e.target.files)
    //currentImages = [...images];
    currentImages.push(e.target.files);
    console.log(currentImages)
    
   // console.log("chosenfiels :  ")
   // console.log(chosenImages)
    //handleUploadFiles(chosenImages)
    //console.log("images")
    //console.log(images)
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
            <input className="sellinput" type="file" multiple onChange={handlePicture} required />
          </fieldset>
          <button type="submit">Submit your listing!</button>
        </form>
      </div>
    </div>

  )
}
