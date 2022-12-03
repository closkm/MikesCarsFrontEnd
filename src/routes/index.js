// index for router
import React, {useState, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import Authenticated from '../pages/Authenticated';
import Main from '../pages/Main'
import BasicExample from '../Navigation/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import UploadListing from '../pages/UploadListing';
import Cart from '../pages/Cart'
import SpecificListing from '../components/SpecificListing';

export default function Routes({ user }) {
  //Check ddoes firebaseId live in backend? if not createa a user with it, no need to ask for info, just disect from user obj
  console.log(user.$.W);
  const [foundUser, setFoundUser] = useState(false);
  const [afterFirstRender, setAfterFirstRender] = useState(false);
  const [userId, setUserId] = useState();

  const createUser = (user) => {
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': 'https://localhost:7057',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    }
    return fetch('https://localhost:7057/api/User/registerUser', fetchOptions)
}

const submit = () => {
  const dataToSend = {
      "firstName": user.displayName,
      "lastName": user.displayName,
      "firebaseId": user.$.W
  }
  createUser(dataToSend)
}

  useEffect(() => {
    fetch(
      'https://localhost:7057/api/User/checkForUser/' + user.$.W,
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
        setFoundUser(r);
        setAfterFirstRender(true);
      });
  }, [])

  useEffect(() => {
    console.log("use effect 2 found user is NOW " + foundUser)
    if(!foundUser && afterFirstRender){
      console.log("running...")
      submit()
    }
    
    if(foundUser){
      fetch(
        'https://localhost:7057/api/User/' + user.$.W,
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
          setUserId(r.id);
        });
    }
  },[foundUser, afterFirstRender])


  return (
    <div>
      <BasicExample />
      <Switch>
        <Route exact path="/cart" component={() => <Cart userId={userId}/>} />
        <Route exact path="/listing" component={() => <SpecificListing />} />
        <Route exact path="/main" component={() => <Main userId={userId}/>} />
        <Route exact path="/upload" component={() => <UploadListing userId={userId}/>} />
        <Route exact path="/" component={() => <Authenticated user={user} />} />
        <Route path="*" component={() => <Authenticated user={user} />} />
      </Switch>
    </div>
  );
}
