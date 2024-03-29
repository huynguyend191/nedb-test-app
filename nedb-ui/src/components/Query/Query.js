import React, { Component } from 'react';
import Axios from 'axios';
import classes from '../../styles/Style.module.css';


class Insert extends Component {

  state = {
    result: null,
    loading: false,
    start: 1,
    end: 1
  }
  
  getAll = () => {
    this.setState({loading: true});
    Axios.get('http://localhost:8000/nedb/')
    .then(result => {
      console.log(result)
      this.setState({ result: `Take ${result.data.time} ms, number of objects: ${result.data.results.length}`, loading: false})
    })
    .catch(error => this.setState({loading: false, result: "Something went wrong"}))
  }

  getOne = () => {
    this.setState({loading: true});
    Axios.get('http://localhost:8000/nedb/' + this.state.start + '/' + this.state.end)
    .then(result => {
      console.log(result)
      this.setState({ result: `Take ${result.data.time} ms, number of objects: ${result.data.results}`, loading: false})
    })
    .catch(error => this.setState({loading: false, result: "Something went wrong"}))
  }

  handleStartChange = (event) => {
    this.setState({start: event.target.value})
  }

  handleEndChange = (event) => {
    this.setState({end: event.target.value})
  }


  render() {
    if(this.state.queryData) {

    }
    let data = 'Processing...'
    if(!this.state.loading) {
      data = this.state.result;
    }
    return (
      <div className={classes.Wrapper}>
        <div className={classes.Controller}>
          <div>
            <button className={classes.Button} onClick={this.getAll}>Get All</button>
          </div>
          <div style={{fontWeight: 'bold'}}>Input key</div>
          <div>
            <p>Start:</p>
            <input value={this.state.start} type="number" onChange={this.handleStartChange} />
            <p>End:</p>
            <input value={this.state.end} type="number" onChange={this.handleEndChange} />
            <button className={classes.Button} onClick={this.getOne}>Get by key</button>
          </div>
        </div>
        <div>
          <div style={{fontWeight: 'bold', margin: '30px'}}>Result:</div>          
          <div className={classes.Result}>{data}</div>
        </div>
      </div>
    );
  }
}

export default Insert;