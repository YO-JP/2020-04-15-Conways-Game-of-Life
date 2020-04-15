import React, { Component } from 'react';
import './App.scss';
import Logic from './component/Logic/Logic';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logic: new Logic(),
      running: false,
      interval: 100
    }

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.createBoard = this.createBoard.bind(this);
    this.storeCell = this.storeCell.bind(this);
  }

  start() {
    if(!this.state.running){
      this.setState({
        running: true,
      }, () => {
        this.intervalRef = setInterval(() => this.run(), this.state.interval);
      })
    }
  }

  stop() {
    this.setState({
      running: false
    }, () => {
      if(this.intervalRef) {
        clearInterval(this.intervalRef);
      }})
  }

  run() {
    this.setState({
      logic: this.state.logic.addGeneration()
    })
  }

  storeCell(position) {
    if(!this.state.running) {
      this.setState({
        logic: this.state.logic.storeCell(position)
      })
    }
  }

  createBoard() {
    var newWorld = [];
    var cellRow = [];

    for(var i = 0; i < 20; i++) {
      for (var j = 0; j < 20; j++){
        if(this.state.logic.isCellOn(i + " , " + j)){
          cellRow.push(
            <Cell key={[i, j]} position={{x: i, y: j}} on={true} storeCell={this.storeCell.bind(this)}/>
          );
        } else {
          cellRow.push(
            <Cell key={[i, j]} position={{x: i, y: j}} on={false} storeCell={this.storeCell.bind(this)}/>
          );
        }
      }
      newWorld.push(<div className="row" key={i}>{cellRow}</div>);
      cellRow = [];
    }

    return newWorld;
  }

  render() {
    return (
      <div className="app">
          <div className="app__buttons">
            <button className="app__button" onClick={this.start}>Start</button>
            <button className="app__button" onClick={this.stop}>Stop</button>
          </div>
          <p className="app__generation">Generation: {this.state.logic.getGeneration()}</p>
        <div className="app__board">
        {this.createBoard()}
        </div>
      </div>
    );
  }
}

class Cell extends Component {
  render() {
    return (
      <div onClick={() => this.props.storeCell(this.props.position)} className={this.props.on ? "app__cell__on" : "app__cell"}></div>
    );
  }
}