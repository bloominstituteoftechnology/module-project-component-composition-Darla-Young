import React from 'react'
import {useState, useEffect} from 'react';
import Axios from 'axios';
import styled from 'styled-components';

const Nasa = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70vw;
`;
const Image = styled.img`
  max-width: 50vw;
  margin: 20px;
`;

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
    <Nasa>
      <h1>{picture.title}</h1>
      <h2>{picture.date}</h2>
      <p>{picture.explanation}</p>
      <Image src={picture.hdurl} alt={'image of ' + picture.title}/>
      <button onClick={getPic}>New Random Photo</button>
    </Nasa>
  )
}

export default App
