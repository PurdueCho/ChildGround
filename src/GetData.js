import React, { Component } from 'react';
import Score from './Score';
import './App.css';

const API = "https://apis.solarialabs.com/shine/v1/total-home-scores/reports?";
const DEFAULT_QUERY = "street-number=110&street-name=E%20Columbia%20street&city=West%20lafayette&state=IN";
const FIL_QUERY = "street-number=5842&street-name=Sterling%20Greens%20Circle&city=Pleasanton&state=CA"
const API_KEY = "&apikey=PxuJn2DYpLkigdkTuOmMi7w8tzKJSMKV";

class GetData extends Component {
  constructor() {
    super();
    this.state = {
    }
  }
  
  componentDidMount() {
    this._getScores();
  };

  _renderScores = () => {
    const c_score = this.state.c_scores;
    const score = this.state.scores;
    // console.log(c_score, score);
    const result = this._getResult();
    console.log(result)

    return <Score
      c_quite={c_score.quiet ? c_score.quiet.value : 'Sorry, no information on this address'}
      c_safety={c_score.safety ? c_score.safety.value : 'Sorry, no information on this address'}
      c_traffic={c_score.traffic ? c_score.traffic.value : 'Sorry, no information on this address'}
      quite={score.quiet ? score.quiet.value : 'Sorry, no information on this address'}
      safety={score.safety ? score.safety.value : 'Sorry, no information on this address'}
      traffic={score.traffic ? score.traffic.value : 'Sorry, no information on this address'}
      result={result}
      c_name={this.props.c_name}
      name={this.props.name}
    />
  }

  _getResult = () => {
    const c_score = this.state.c_scores;
    const score = this.state.scores;

    let result = Result (
      c_score.quiet?c_score.quiet.value:0,
      c_score.safety?c_score.safety.value:0,
      c_score.traffic?c_score.traffic.value:0,
      score.quiet?score.quiet.value :0,
      score.safety?score.safety.value :0,
      score.traffic?score.traffic.value :0
    )
    const NOTWORTH = "Not Worth";
    const MODERATE = "Moderate";
    const WORTH = "Worth";
    const FAILURE = "Sorry, not enough information to estimate";

    console.log(result)
    if (result === 0) return FAILURE;
    if (result < 10) return NOTWORTH
    if (result >= 10 && result <30) return MODERATE
    if (result >=30) return WORTH

  }

  _getScores = async () => {
    const c_scores = await this._callApi(this.props.c_query); // wait til function is complete
    const scores = await this._callApi(this.props.query); // wait til function is complete
    // console.log({c_scores, scores})
    this.setState({
      c_scores,
      scores
    });
  };

 
  _callApi = (query) => {
    const QUERY = query;
    // return fetch(API + DEFAULT_QUERY + API_KEY)
    //return fetch(API + FIL_QUERY + API_KEY)
    return fetch(API + QUERY + API_KEY)
      .then(response => response.json())
      .then(data => data.totalHomeScores)
      .catch(error => {
        console.log(error)
        alert("Sorry :( It's invalid information");
        window.location.href = "/";
      })
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

function Result (c_quite, c_safety, c_traffic, quite, safety, traffic) {
    let c_q_score = c_quite * 0.45;
    let c_s_score = c_safety * 0.35;
    let c_t_score = c_traffic * 0.2;
    let c_sub = c_q_score + c_s_score + c_t_score;

    let q_score = quite * 0.45;
    let s_score = safety * 0.35;
    let t_score = traffic * 0.2;
    let sub = q_score + s_score + t_score;

    if (c_sub === 0 || sub === 0) {
      return 0;
    }
    let diff = sub - c_sub;
    return diff 
}

export default GetData;

