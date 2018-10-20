import React, { Component } from 'react';
import Score from './Score'
import './App.css';

const API = "https://apis.solarialabs.com/shine/v1/total-home-scores/reports?";
const DEFAULT_QUERY = "street-number=110&street-name=E%20Columbia%20street&city=West%20lafayette&state=IN&apikey=";
const API_KEY = "PxuJn2DYpLkigdkTuOmMi7w8tzKJSMKV";

class GetData extends Component {
  constructor() {
    super();
    this.state = {}
  }
  
  componentDidMount() {
    this._getScores();
  };

  _renderScores = () => {
    const score = this.state.scores;
    console.log(score);
    return <Score
      quite={score.quiet.value}
      safety={score.safety.value}
      traffic={score.traffic.value}
      />
  }

  _getScores = async () => {
    const scores = await this._callApi(); // wait til function is complete
    console.log(scores)
    this.setState({
      scores
    });
  };
 
  _callApi = () => {
    return fetch(API + DEFAULT_QUERY + API_KEY)
      .then(response => response.json())
      .then(data => data.totalHomeScores)
      .catch(err => console.log(err))
  }


  render() {
    // console.log('did render')
    const {scores} = this.state
    return (
      <div className={ scores ? "App" : "App--loading" } >
        { this.state.scores ? this._renderScores() : 'Loading' }
      </div>
    );
  }
}

export default GetData;

