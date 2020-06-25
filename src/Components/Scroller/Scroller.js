import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './Scroller.module.css'
import {Paper} from '@material-ui/core'
const Scroller = ({memes, handleSelection}) => {
  const memesImg = memes.map((meme) => (
    <img
      src={meme.url}
      key={meme.id}
      className={styles.memeimg}
      title={meme.name}
      data-box_count={meme.box_count}
      data-url={meme.url}
      data-id={meme.id}
      data-name={meme.name}
      data-height={meme.height}
      data-width={meme.width}
      onClick={(e) => {
        handleSelection(e.target);
      }}
    />
  ));
  return (
    <div className = {styles.container}>
      {memesImg}
    </div>
  );
  
};

export default Scroller;

