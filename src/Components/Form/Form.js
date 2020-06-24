import React from 'react';
import styles from './Form.module.css';
import {TextField} from '@material-ui/core'

const Form = ({boxes, handleInput, fontSize, handleFontSize}) => {  
  const totalInput = () => {
      if(boxes.length){
        const inputTab = boxes.map((obj, ind) => {
          const txt = `Text ${ind+1}`
          return (
            <div style={{ display: "flex", alignItems: "center", marginBottom: "2vh" }}>
              <TextField
                id="outlined-basic"
                label={txt}
                type="text"
                value={obj.text}
                onChange={handleInput}
                id={ind}
                key={ind}
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                key={0.1 * ind + 1}
                type="text"
                id={ind}
                label="size"
                value={fontSize[ind]}
                onChange={handleFontSize}
                style={{ marginLeft: "2vw" }}
                style={{
                  // padding: "3px",
                  // backgroundColor: "rgb(214, 214, 214)",
                  padding:"0px",
                
                  marginLeft: "2vw",
                  width: "50px",
                  marginRight: "2vw",
                }}
              />
              <input
                key={10 * ind + 1}
                type="range"
                id={ind}
                label={fontSize[ind]}
                value={fontSize[ind]}
                onChange={handleFontSize}
                min="5"
                max="60"
                title={fontSize[ind]}
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

