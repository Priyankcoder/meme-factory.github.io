import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './Scroller.module.css'

const Scroller = ({memes, handleSelection}) => {
  const memesImg = memes.map(
    (meme)=><img src = {meme.url}  key = {meme.id} className = {styles.memeimg} 
    data-box_count = {meme.box_count} data-url = {meme.url} data-id = {meme.id} 
    data-height = {meme.height} data-width = {meme.width} onClick = {(e)=>{handleSelection(e.target)}}></img>)
  console.log(memesImg);
  return (
    <div className = {styles.container}>
      {memesImg}
    </div>
  );
  
};

export default Scroller;
