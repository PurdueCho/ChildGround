import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import './MyForm.css'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
  },
});

class MyForm extends Component {
  constructor() {
    super();
    this.state = {
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
      shown: true,
    };
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
    });
  }

  handleSubmit = (e) => {
    // 
    e.preventDefault();

    // pass to parent
    const c_query = this._getC_Query().replace(/\s/g, "%20");
    const query = this._getQuery().replace(/\s/g, "%20");
    const c_name = this.state.c_streetNumber + " " + this.state.c_streetName + " " + this.state.c_city + " " + this.state.c_state + " " + this.state.c_zipcode;
    const name = this.state.streetNumber + " " + this.state.streetName + " " + this.state.city + " " + this.state.state + " " + this.state.zipcode;
    this.props.onCreate({c_query, query, c_name, name});

    // on submit
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
      shown: !this.state.shown,
    });
  }
  render() {
    const { classes } = this.props;
    let shown = {
			display: this.state.shown ? "block" : "none"
		};
    
    return (
      <div className="MyForm" style = {shown}>
        <form onSubmit={this.handleSubmit}>
          <div className="form_contaioner">
            <FormGroup className="_col1">
              <legend className="_col_legend">Enter Current Address</legend>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-simple">Street Number</InputLabel>
                <Input
                  placeholder = "Street number of the address (e.g. '1')"
                  value={this.state.c_streetNumber}
                  onChange={this.handleChange}
                  name="c_streetNumber"
                  required = {true}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-simple">Street Name</InputLabel>
                <Input
                  placeholder = "Street name of the address (e.g. 'Main Street')"
                  value={this.state.c_streetName}
                  onChange={this.handleChange}
                  name="c_streetName"
                  required = {true}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-simple">City</InputLabel>
                <Input
                  placeholder = "City name (e.g. 'Boston')"
                  value={this.state.c_city}
                  onChange={this.handleChange}
                  name="c_city"
                  required = {true}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-simple">State</InputLabel>
                <Input
                  placeholder = "State name (as standard USPS 2-letter abbreviation, e.g. 'MA')"
                  value={this.state.c_state}
                  onChange={this.handleChange}
                  name="c_state"
                  required = {true}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Zipcode</InputLabel>
              <Input
                placeholder = "ZIP code (e.g. '02129') (Optional)"
                value={this.state.c_zipcode}
                onChange={this.handleChange}
                name="c_zipcode"
              />
            </FormControl>
            </FormGroup>
            <FormGroup className="_col2">
            <legend className="_col_legend">Enter Interested Address</legend>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-simple">Street Number</InputLabel>
                <Input
                  placeholder = "Street number of the address (e.g. '1')"
                  value={this.state.streetNumber}
                  onChange={this.handleChange}
                  name="streetNumber"
                  required = {true}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-simple">Street Name</InputLabel>
                <Input
                  placeholder="Street name of the address (e.g. 'Main Street')"
                  value={this.state.streetName}
                  onChange={this.handleChange}
                  name="streetName"
                  required = {true}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-simple">City</InputLabel>
                <Input
                  placeholder="City name (e.g. 'Boston')"
                  value={this.state.city}
                  onChange={this.handleChange}
                  name="city"
                  required = {true}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-simple">State</InputLabel>
                <Input
                  placeholder="State name (as standard USPS 2-letter abbreviation, e.g. 'MA')"
                  value={this.state.state}
                  onChange={this.handleChange}
                  name="state"
                  required = {true}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Zipcode</InputLabel>
              <Input
                placeholder = "ZIP code (e.g. '02129') (Optional)"
                value={this.state.zipcode}
                onChange={this.handleChange}
                name="zipcode"
              />
            </FormControl>
            </FormGroup>
          </div>
          <div className="form_btn">
            <Button variant="contained" color="primary" type="submit" className="_btn_sub">Submit</Button>
          </div>
        </form>
      </div>
    );
  }
}
MyForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyForm);
