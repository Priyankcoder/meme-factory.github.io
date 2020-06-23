import React from 'react';
import styles from './Form.module.css';

const Form = ({boxes, handleInput, fontSize, handleFontSize}) => {  
  const totalInput = () => {
      if(boxes.length){
        const inputTab = boxes.map((obj, ind) => {
          const txt = `Text ${ind}`
          return (
            <div>
              <label htmlFor={txt}>{txt}</label>
              <input
                type="text"
                placeholder={txt}
                value={obj.text}
                onChange={handleInput}
                id={ind}
                key={ind}
              />
              <input
                key = {10*ind+1}
                type="range"
                id={ind}
                value= {fontSize[ind]}
                onChange={handleFontSize}
                min = "5"
                max = "60"
              />
            </div>
          );
        })
        return inputTab
      }
      return ""
    }
    return (
      <div className = {styles.container}>
        {totalInput()}
      </div>
    );
}

export default Form;