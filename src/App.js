import React, { Component } from 'react';

import './App.css';
import GetData from './GetData'
import MyForm from './MyForm'

class App extends Component {
  constructor() {
    super();
  };

  state = {};

  handleCreate = (data) => {
    this.setState({
      form: data,
    });
  }

  render() {
    // console.log('did render')
    const {form} = this.state;
    return (
      <div>
        <MyForm onCreate={this.handleCreate} />
        {console.log(form)}
        { this.state.form ? <GetData /> : '' }
      </div>
    );
  }
  
}

export default App;

