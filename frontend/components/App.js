import React from 'react'
import {useState, useEffect} from 'react';
import Axios from 'axios';

function App () {
  const [picture, setPicture] = useState({title: '', date: '', explanation: '', hdurl: ''});

  const getPic = () => {
    Axios
      .get ('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=1')
      .then (response => {
        console.log (response.data[0]); /* {date, explanation, hdurl, media_type, service_version, title, url} */
        if (response.data[0].media_type != 'image') {getPic()}
        else {setPicture(response.data[0])}
      })
      .catch(error => console.log(error));
  }

  useEffect(getPic, []);

  return (
    <div className='nasa'>
      <h1>{picture.title}</h1>
      <h2>{picture.date}</h2>
      <p>{picture.explanation}</p>
      <img src={picture.hdurl} alt={'image of ' + picture.title}/>
      <button onClick={getPic}>New Random Photo</button>
    </div>
  )
}

export default App
