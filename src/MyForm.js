import React, { Component } from 'react';

// street-number=110&street-name=E%20Columbia%20street&city=West%20lafayette&state=IN

class MyForm extends Component {
  state = {
    streetNumber: '',
    streetName: '',
    city:'',
    state:'',
    zipcode:'',
    query:'',
  }

  _getQuery = () => {
    const query = this.state.streetNumber + this.state.thistreetName + this.state.city + this.state.state + this.state.zipcode;
    console.log(query);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    // 페이지 리로딩 방지
    e.preventDefault();
    // 상태값을 onCreate 를 통하여 부모에게 전달
    this.props.onCreate(this.state);
    // 상태 초기화
    this.setState({
      streetNumber: '',
      streetName: '',
      city:'',
      state:'',
      zipcode:'',
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder = "Street Number"
          value={this.state.streetNumber}
          onChange={this.handleChange}
          name="streetNumber"
        />
        <input
          placeholder="Street Name"
          value={this.state.streetName}
          onChange={this.handleChange}
          name="streetName"
        />
        <input
          placeholder="City"
          value={this.state.city}
          onChange={this.handleChange}
          name="city"
        />
        <input
          placeholder="State"
          value={this.state.state}
          onChange={this.handleChange}
          name="state"
        />
        <input
          placeholder="Zipcode"
          value={this.state.zipcode}
          onChange={this.handleChange}
          name="zipcode"
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}


export default MyForm;