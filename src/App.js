import React from 'react';
import styles from './App.module.css';
import {fetchMemes} from './Api'
import {Canvas, Scroller, Form} from './Components'
import axios from 'axios';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { all: [], choosen: "", onDisplay: 2, displayList: [], url: "", boxes: [], fontSize: [] };
    this.handleDisplayList = this.handleDisplayList.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleDimension = this.handleDimension.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleFontSize = this.handleFontSize.bind(this);

    
  }
  async componentDidMount() {
    const memes = await fetchMemes();
      console.log(memes);
      this.setState({all:memes, displayList: memes.slice(0,2)});
  }
  handleDisplayList(){
    const {all, choosen, onDisplay, displayList}= this.state
    this.setState({onDisplay: onDisplay+2, displayList: displayList.concat(all.slice(onDisplay, onDisplay+2))});
    
  }
  async handleSelection(target){
    const data = await(target.dataset);
    this.setState({ choosen: data });

  }
  async handleDownload(){
    const params = (boxes) => {
      let string = "";
      boxes.map((obj, ind) => {
        const pairs = Object.entries(obj).forEach(([key, value]) => {
          string += `&boxes[${ind}][${key}]=${value}`;
        });
      });
      return string;
    }
    const result = await fetch(
      `https://api.imgflip.com/caption_image?template_id=${this.state.choosen.id}&username=crispycapsicum&password=priyank123${params(this.state.boxes)}`
    )
    const json = await result.json();
    console.log(json.data.url);
  }
  
  async handleText(){
    const canvasDim = document.getElementById("canvas").getBoundingClientRect();
    const originalMemeDim = this.state.choosen;
    const widthConst = originalMemeDim.width / (canvasDim.width - 4);
    const heightConst = originalMemeDim.height / (canvasDim.height - 4);
    this.setState((state, props) => {
      return {boxes: state.boxes.concat(
        {text: "Hello",x: 0, y: 0, width: widthConst*38, height: heightConst*19}
      ), fontSize: state.fontSize.concat(20)}
    })

  }

  async handleDimension(id, x, y, width, height){ 
    const canvasDim = document.getElementById("canvas").getBoundingClientRect();
    const originalMemeDim = this.state.choosen
    const widthConst = originalMemeDim.width/(canvasDim.width-4);
    const heightConst = originalMemeDim.height / (canvasDim.height - 4);
    const Id = +id[1];
    console.log(Id)
    this.setState((state, props)=>{
      const newBoxes = state.boxes;
      newBoxes[Id].x = widthConst*x;
      newBoxes[Id].y = heightConst*y;
      newBoxes[Id].width = widthConst*width;
      newBoxes[Id].height = heightConst*height;
      return {boxes: newBoxes}
    })

  }
  
  async handleInput(event){
    const id = event.target.id;
    const value = event.target.value;
    this.setState((state)=>{
      const newBoxes = state.boxes;
      newBoxes[id].text = value;
      return {boxes: newBoxes}
    })
  }

  async handleFontSize(event){
    const id = event.target.id;
    console.log(id);
    const value = event.target.value;
    console.log(value)
    const ball =  document.getElementById(`t${id}`);
    // console.log(ball)
    // console.log(width);
    // console.log(height);
    this.setState((state,props) => {
      let newFont = state.fontSize;
      newFont[id] = value;
      return { fontSize: newFont};
    });
    const imgBox = document.getElementById("canvas");
    const x = ball.offsetLeft - imgBox.offsetLeft;
    const y = ball.offsetTop - imgBox.offsetTop;
    const width = ball.offsetWidth;
    const height = ball.offsetHeight;
    this.handleDimension(ball.id, x, y, width, height);

  }


  render() {
    return (
      <div className={styles.App} key = "1">
        <Scroller
          memes={this.state.displayList}
          handleSelection={this.handleSelection}
        />
        <button onClick={this.handleDisplayList}>More</button>
        <div className={styles.playground}>
          {this.state.choosen !== "" ? (
            <Canvas
              selected={this.state.choosen}
              boxes={this.state.boxes}
              handleDimension={this.handleDimension}
              fontSize = {this.state.fontSize}
            />
          ) : (
            ""
          )}
          <div>
            {this.state.choosen !== "" ? (
              <button onClick={this.handleText}>Text Box</button>
            ) : (
              ""
            )}
            {this.state.choosen !== "" ? <Form boxes={this.state.boxes} handleInput = {this.handleInput} fontSize = {this.state.fontSize} handleFontSize = {this.handleFontSize}/> : ""}
          </div>

          <a
            href={this.state.url}
            target="_blank"
            onClick={this.handleDownload}
          >
            Download
          </a>
        </div>
      </div>
    );
  }
}

export default App;
