import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Service from './service'

class App extends Component {
  state={
    champions: []
  }
  componentDidMount(){
    Service.champions(2014,2014).then(result => {
      this.setState({champions: result})
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-title-bg-left"/>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">F1 Races and Champions</h1>
        </header>
        <p className="App-intro">
          Find historic race results
          {JSON.stringify(this.state.champions)}
        </p>
      </div>
    );
  }
}

export default App;
