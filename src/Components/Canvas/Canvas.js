import React from "react";
import styles from './Canvas.module.css';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";





const Canvas = ({selected, boxes, handleDimension, fontSize}) => {
  const dragDrop = function (event){
    const ball = event.target;
    const imgBox = document.getElementById("canvas");
    // (1) prepare to moving: make absolute and on top by z-index
    ball.style.position = "absolute";
    ball.style.zIndex = 3;

    // move it out of any current parents directly into body
    // to make it positioned relative to the body
    document.body.append(ball);

    // centers the ball at (pageX, pageY) coordinates
    function moveAt(pageX, pageY) {
      ball.style.left = pageX - ball.offsetWidth / 2 + "px";
      ball.style.top = pageY - ball.offsetHeight / 2 + "px";
    }

    // move our absolutely positioned ball under the pointer
    moveAt(event.pageX, event.pageY);

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    // (2) move the ball on mousemove
    imgBox.addEventListener("mousemove", onMouseMove);

    // (3) drop the ball, remove unneeded handlers
    ball.onmouseup = function () {
      imgBox.removeEventListener("mousemove", onMouseMove);
      ball.onmouseup = null;  
      const x = ball.offsetLeft - imgBox.offsetLeft;
      const y = ball.offsetTop - imgBox.offsetTop;
      const width = ball.offsetWidth;
      const height = ball.offsetHeight;
      handleDimension(ball.id, x, y, width, height);
    }
  }
  const textOnCanvas = (boxes, fontSize) => {
    const html = boxes.map((obj, ind) => {
      const id = `t${ind}`
      const styling = {
        display: "flex",
        width: "fit-content",
        height: "fit-content",
        position: "absolute",
        overflow: "hidden",
        cursor: "grab",
        fontSize: `${fontSize[ind]}px`,
      };
      return (
        <div
          style={styling}
          key={ind}
          onMouseDown={dragDrop}
          className={styles.txt}
          id={id}
          onDragStart={() => false}
        >
          {obj.txt}
        </div>
      );
      
    });
    return html;
  } 
  return (
    <div className={styles.container} id = "canvas">
      <img src={selected.url} alt="" width="100%" id = "img" draggable = "false" />
      {boxes.length!==0 ? textOnCanvas(boxes, fontSize) : ""}
    </div>
  );
  
};

export default Canvas;
