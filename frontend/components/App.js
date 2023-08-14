import React from 'react'
import {useState, useEffect} from 'react';
import Axios from 'axios';

function App() {
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [explanation, setExplanation] = useState();
  const [picture, setPicture] = useState();

  const changePic = () => {
    Axios
      .get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
      .then(response => {
        console.log(response.data); /* {date, explanation, hdurl, media_type, service_version, title, url} */
        setTitle(response.data.title); 
        setDate(response.data.date); 
        setExplanation(response.data.explanation); 
        setPicture(response.data.hdurl);
      })
      .catch(error => console.log(error));
  }

  useEffect(changePic, []);

  const style = {
    fontSize: '1.5 rem',
    margin: '0.5 rem'
  }

  return (
    <div className='nasa'>
      <h1>{title}</h1>
      <h2>{date}</h2>
      <p>{explanation}</p>
      <img src={picture} alt={'image of ' + title}/>
      <button onClick={changePic} style={style}>New Random Photo</button>
    </div>
  )
}

export default App
