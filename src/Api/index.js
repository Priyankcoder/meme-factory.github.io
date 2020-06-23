import React from 'react';
import axios from 'axios';

export const fetchMemes = async()=>{
    const {data:{data:{memes}}} = await axios.get("https://api.imgflip.com/get_memes");
    return memes
}


