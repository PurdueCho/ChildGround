import React, { Component } from 'react';

import './App.css';
import GetData from './GetData'
import MyForm from './MyForm'
import logo from './asset/logo.png';

class App extends Component {

  state = {
    showForms: true,
  };

  handleCreate = (data) => {
    this.setState({
      c_query: data.c_query,
      query: data.query,
      c_name: data.c_name,
      name: data.name,
      showForms: false,
    });
  }

  render() {
    // console.log('did render')
    const {c_query, query, c_name, name} = this.state;
    console.log(c_query, query);
    return (
      <div className="App">
        <div className="Title">
          <h1>A Safer Place for your Kids!</h1>
          <img src = {logo} alt ="logo"/>
        </div>
        <div className="MyForm">
          <MyForm onCreate={this.handleCreate} />
        </div>
        { this.state.query ? <GetData c_query={c_query} query={query} c_name={c_name} name={name} /> : '' }
      </div>
    );
  }
  
}

export default App;

