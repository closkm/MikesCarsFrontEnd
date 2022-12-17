import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import '../styles/listing.css'

export default function SpecificListing({props}) {
    const [images, setImages] = useState([]);
    const [loggedInUsersListing, setLoggedInUsersListing] = useState(false);
    const {state} = useLocation();
    const {id, type, maker, price, dateOfListing, favorites, address, purchased, inCart} = state.listing;
    const {mpg, crashes, electric, warranty, miles} = state.editFacts;
    const [editType, setEditType] = useState(type);
    const [editAddress, setEditAddress] = useState(address);
    const [editMaker, setEditMaker] = useState(maker);
    const [editPrice, setEditPrice] = useState(price);
    const [editMpg, setEditMpg] = useState(mpg)
    const [editMiles, setEditMiles] = useState(miles);
    const [editCrashes, setEditCrashes] = useState(crashes);
    const [editElectric, setEditElectric] = useState(electric);
    const [editWarranty, setEditWarranty] = useState(warranty);

    const obj = {
      "editType" : setEditType,
      "editAddress" : setEditAddress,
      "editMaker" : setEditMaker,
      "editPrice" : setEditPrice,
      "editMpg" : setEditMpg,
      "editMiles" : setEditMiles,
      "editCrashes" : setEditCrashes,
      "editElectric" : setEditElectric,
      "editWarranty" : setEditWarranty
    }
    
    
    const [editMode, setEditMode] = useState(false);
    const [displayNum, setDisplayNum] = useState(0);

    const history = useHistory();

    const handleChange = (e) => {
      obj[e.target.id](e.target.value);
      console.log(e.target.id + ":" + e.target.value)

    }

    const handleRadio = (e) => {
      setEditWarranty(prev => !prev);
    }
    const handleElectric = (e) => {
      setEditElectric(prev => !prev);
    }
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
    
    const handleEditListing = () => {
        setEditMode(prev => !prev);
    }

    const handleDeleteListing = () => {
        //ADD ARE YOU SURE WINDOW POP UP befoire deleting
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

   const sendRequest = (newListing) => {
    const fetchOptions = {
      method: 'PUT',
      headers: {
          'Access-Control-Allow-Origin': 'https://localhost:7057',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(newListing)
  }
  return fetch('https://localhost:7057/api/Listing/NewListing', fetchOptions)
  }
  
  const sendFactRequest = (newListing) => {
    const fetchOptions = {
      method: 'PUT',
      headers: {
          'Access-Control-Allow-Origin': 'https://localhost:7057',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(newListing)
  }
  return fetch('https://localhost:7057/api/Fact/EditFacts', fetchOptions)
  }

   const submit = () => {

    const dataToSend = {
      "id" : id,
      "type" : editType,
      "maker" : editMaker,
      "address" : editAddress,
      "price" : editPrice,
      "dateOfListing": dateOfListing,
      "favorites": favorites,
      "purchased": purchased,
      "inCart": inCart
    }
    const factsToSend = {
        "id" : 0,
        "electric" : editElectric ? true : false,
        "listingId" : id,
        "mpg" : editMpg,
        "crashes" : editCrashes,
        "miles" : editMiles,
        "warranty" : editWarranty ? true : false,
    } 
     sendRequest(dataToSend);
     sendFactRequest(factsToSend);
     navigateToListing()
   }


  return (
    <div>
        {editMode ? 
        <div>
        <h1>edit mode</h1>

        <div className="sellForm">
        <form onSubmit={submit}>
          <h4>Please select your vehilce make</h4>
          <fieldset className="sellField">
            <select name="Maker" id="editMaker" onChange={handleChange}>
            <option name="radioCondition" className="sellinput" id="editMaker" value="Tesla" >Tesla</option>
            <option name="radioCondition" className="sellinput" id="editMaker" value="Mercedes" >Mercedes</option>
            <option name="radioCondition" className="sellinput" id="editMaker" value="Mazda" >Mazda</option>
            <option name="radioCondition" className="sellinput" id="editMaker" value="Ford" >Ford</option>
            </select>
          </fieldset>
          <fieldset className="sellField">
            <input className="sellinput" id="editType" type="text" placeholder="Vehicle Type" onChange={handleChange} value={editType} required />
          </fieldset>
          <fieldset className="sellField">
            <input className="sellinput" id="editAddress" type="text" placeholder="Address" onChange={handleChange} value={editAddress} required />
          </fieldset>
          <fieldset className="sellField">
            <input className="sellinput" id="editPrice" type="number" placeholder="Selling Price" onChange={handleChange} value={editPrice} required />
          </fieldset>
          

          
          <fieldset className="sellField">
            <input className="sellinput" id="editMpg" type="number" placeholder="MPG" onChange={handleChange} value={editMpg} required />
          </fieldset>
          <fieldset className="sellField">
            <input className="sellinput" id="editCrashes" type="number" placeholder="Number of Crashes" onChange={handleChange} value={editCrashes} required />
          </fieldset>
          <fieldset className="sellField">
            <input className="sellinput" id="editMiles" type="number" placeholder="Vehicle Miles" onChange={handleChange} value={editMiles} required />
          </fieldset>
          <fieldset className="sellField">
          <h5>Is your car still under warranty?</h5>
            <p><input name="warrantCondition" className="sellinput" checked={editWarranty === true} id="editWarranty" type="checkbox" onChange={handleRadio} value={editWarranty} />Under Warranty</p>
          </fieldset>
          <fieldset className="sellField">
            <h5>Is your car electric?</h5>
            <p><input name="radioCondition" className="sellinput" checked={editElectric === true} id="editElectric" type="checkbox" onChange={handleElectric} value={editElectric} />Is Electric</p>
          </fieldset>

          

          <button type="submit">Submit your listing!</button>
          <button onClick={() => handleEditListing()}>Cancel</button>
        <button type="submit">Save</button> 
        </form>
      </div>





        </div>
        :
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
        {electric ? "YES" : "NO"}
        </div>
        <div>
            MPG : {mpg}
        </div>
        {loggedInUsersListing ?
        <>
        <h1>THIS IS UR LISTING</h1>
        <button onClick={() => handleDeleteListing()}>Delete Listing</button>
        <button onClick={() => handleEditListing()}>Edit Listing</button>
        </> 
        : <h1>THIS IS NOT UR LISTING</h1>}
        </div>
        </div>}
    </div>
  )
}


// <fieldset className="sellField">
//             <input id="images1" className="sellinput" type="text" onChange={handleChange} value={images1} required />
//             <input id="images2" className="sellinput" type="text" onChange={handleChange} value={images2} required />
//             <input id="images3" className="sellinput" type="text" onChange={handleChange} value={images3} required />
//           </fieldset>