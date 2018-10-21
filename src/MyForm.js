import React, { Component } from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';

// street-number=110&street-name=E%20Columbia%20street&city=West%20lafayette&state=IN

class MyForm extends Component {
  state = {
    c_streetNumber: '',
    c_streetName: '',
    c_city:'',
    c_state:'',
    c_zipcode:'',
    streetNumber: '',
    streetName: '',
    city:'',
    state:'',
    zipcode:'',
  }

  _getC_Query = () => {
    let c_query = "street-number=" + this.state.c_streetNumber + "&street-name=" + this.state.c_streetName + "&city=" + this.state.c_city + "&state=" + this.state.c_state + "&zip-code=" + this.state.c_zipcode;
    return c_query;
  }

  _getQuery = () => {
    let query = "street-number=" + this.state.streetNumber + "&street-name=" + this.state.streetName + "&city=" + this.state.city + "&state=" + this.state.state + "&zip-code=" + this.state.zipcode;
    return query;
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
    const c_query = this._getC_Query().replace(/\s/g, "%20");
    const query = this._getQuery().replace(/\s/g, "%20");
    this.props.onCreate({c_query, query});
    // 상태 초기화
    this.setState({
      c_streetNumber: '',
      c_streetName: '',
      c_city: '',
      c_state: '',
      c_zipcode: '',
      streetNumber: '',
      streetName: '',
      city:'',
      state:'',
      zipcode:'',
    });
  }
  render() {
    return (
      // <Form>
      //   <legend>Title</legend>
      //   <Input placeholder="Input 1" />
      //   <Input placeholder="Input 2" />
      //   <Textarea placeholder="Textarea" />
      //   <Button variant="raised">Submit</Button>
      // </Form>
      <Form onSubmit={this.handleSubmit} className="Form">
        <legend>Enter Current Address</legend>
        <Input
          placeholder = "Current Street Number"
          value={this.state.c_streetNumber}
          onChange={this.handleChange}
          name="c_streetNumber"
        />
        <Input
          placeholder = "Current Street Name"
          value={this.state.c_streetName}
          onChange={this.handleChange}
          name="c_streetName"
        />
        <Input
          placeholder = "Current City"
          value={this.state.c_city}
          onChange={this.handleChange}
          name="c_city"
        />
        <Input
          placeholder = "Current State"
          value={this.state.c_state}
          onChange={this.handleChange}
          name="c_state"
        />
        <Input
          placeholder = "Current Zipcode"
          value={this.state.c_zipcode}
          onChange={this.handleChange}
          name="c_zipcode"
        />
        <legend>Enter Interested Address</legend>
        <Input
          placeholder = "Street Number"
          value={this.state.streetNumber}
          onChange={this.handleChange}
          name="streetNumber"
        />
        <Input
          placeholder="Street Name"
          value={this.state.streetName}
          onChange={this.handleChange}
          name="streetName"
        />
        <Input
          placeholder="City"
          value={this.state.city}
          onChange={this.handleChange}
          name="city"
        />
        <Input
          placeholder="State"
          value={this.state.state}
          onChange={this.handleChange}
          name="state"
        />
        <Input
          placeholder="Zipcode"
          value={this.state.zipcode}
          onChange={this.handleChange}
          name="zipcode"
        />
        <Button variant="raised" type="submit">Submit</Button>
      </Form>
    );
  }
}


export default MyForm;