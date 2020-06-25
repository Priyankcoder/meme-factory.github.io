import React from 'react';
import './App.css';
import {fetchMemes} from './Api'
import {Canvas, Scroller, Form} from './Components'
import axios from 'axios';
import { Button} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import circle from './images/circle.svg';
import factory from'./factory.svg';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { all: [], choosen: "", onDisplay: 20, displayList: [], url: "", boxes: [], fontSize: [] };
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
      this.setState({all:memes, displayList: memes.slice(0,20)});
  }
  handleDisplayList(){
    const {all, choosen, onDisplay, displayList}= this.state
    this.setState({onDisplay: onDisplay+20, displayList: displayList.concat(all.slice(onDisplay, onDisplay+20))});
    
  }
  async handleSelection(target){
    document.querySelector(".prepare").textContent = "Generate Meme";
    const data = await(target.dataset);
    this.setState({ choosen: data });
  }
  async handleDownload(){
    // document.getElementById("generate-txt").style.display = "none";
    const params = (boxes) => {
      let string = "";
      boxes.map((obj, ind) => {
        const pairs = Object.entries(obj).forEach(([key, value]) => {
          string += `&boxes[${ind}][${key}]=${value}`;
        });
      });
      return string;
    }
    const resultUrl = await fetch(
      `https://api.imgflip.com/caption_image?template_id=${this.state.choosen.id}&username=crispycapsicum&password=priyank123${params(this.state.boxes)}`
    ).then((result)=>result.json())
     .then((json)=>json.data.url);
     console.log(resultUrl);
    // var fileDownload = require("js-file-download");
    this.setState((state)=>{
      return {url: resultUrl}
    })
    const download = document.querySelectorAll(".download");
    download.forEach((ele)=>ele.style.display = "flex")
    document.querySelector(".prepare").textContent = "Scroll Down for Result"
     

    
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
    const ele = document.querySelector(".prepare");
    ele.style.display = "flex";
    ele.textContent = "Generate Meme"

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
      <div
        style={{
          backgroundColor: "rgb(238, 235, 235)",
          height: "600px",
          width: "100%",
        }}
      >
        <div className="app" key="1">
          <h1 style={{ marginTop: "20px", marginBottom: "10px", wordSpacing: "10px" }}>
            <img
              src={factory}
              style={{
                width: "10vw",
                maxWidth: "80px",
                marginRight: "2vw",
                transform: "scaleX(-1)"
              }}
            />
            MEME FACTORY
            <img
              src={factory}
              style={{ width: "10vw", maxWidth: "80px", marginLeft: "2vw" }}
            />
          </h1>
          <Scroller
            memes={this.state.displayList}
            handleSelection={this.handleSelection}
          />

          <a
            variant="contained"
            color="primary"
            onClick={this.handleDisplayList}
            className="button"
            style={{
              marginLeft: "auto",
              marginRight: "10px",
              marginTop: "4vh",
            }}
          >
            More
          </a>

          <div className="playground">
            {this.state.choosen !== "" ? (
              <Canvas
                selected={this.state.choosen}
                boxes={this.state.boxes}
                handleDimension={this.handleDimension}
                fontSize={this.state.fontSize}
              />
            ) : (
              ""
            )}
            <div className="tool">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {this.state.choosen !== "" ? (
                  this.state.boxes.length <= 4 ? (
                    <a
                      className="button"
                      onClick={this.handleText}
                      style={{
                        marginBottom: "4vh",
                        marginTop: "4vh",
                        marginRight: "2vh",
                      }}
                    >
                      Text Box
                    </a>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}

                <a
                  onClick={this.handleDownload}
                  className="prepare button"
                  id="generate"
                >
                  <span id="generate-txt">Generate Meme</span>
                </a>
              </div>
              {this.state.choosen !== "" ? (
                <Form
                  boxes={this.state.boxes}
                  handleInput={this.handleInput}
                  fontSize={this.state.fontSize}
                  handleFontSize={this.handleFontSize}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <h1 className="download">Result</h1>
          <div className="download">
            <img src={this.state.url} alt="" width="100%" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
