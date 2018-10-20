import React, { Component } from 'react';

import './App.css';
import GetData from './GetData'
import MyForm from './MyForm'

class App extends Component {

  state = {};

  handleCreate = (data) => {
    this.setState({
      c_query: data.c_query,
      query: data.query,
    });
  }

  render() {
    // console.log('did render')
    const {c_query, query} = this.state;
    console.log(c_query, query);
    return (
      <div>
        <MyForm onCreate={this.handleCreate} />
        {/* {console.log(form)} */}
        { this.state.query ? <GetData c_query={c_query} query={query} /> : '' }
      </div>
    );
  }
  
}

export default App;

