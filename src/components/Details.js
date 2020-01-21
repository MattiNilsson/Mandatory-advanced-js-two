import React from 'react';
import axios from "axios";

import {Helmet} from "react-helmet";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Details extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      movie : [],
    }
  }
  componentDidMount(){
    (axios.get("http://3.120.96.16:3001/movies/" + this.props.match.params.id)
      .then((response) =>{
        console.log(response);
        this.setState({movie : response.data});
      })
      .catch((error) =>{
        alert("SOMETHING WENT TERRIBLE WRONG LMAO")
      })
    )
  }

  render(){
    return (
      <div className="overall">
        <h1>Movie Details</h1>
        <Helmet>
          <title>Matti - Details</title>
        </Helmet>
        <h2 className="dHead">{this.state.movie.title}</h2>
        <h3 className="dDir">{this.state.movie.director}</h3>
        <h3 className="dRating">rating : {this.state.movie.rating}</h3>
        <p className="dDesc">{this.state.movie.description}</p>
        <Link to={"/Edit/" + this.props.match.params.id} className="link">
          <button className="btn">Edit</button>
        </Link>
      </div>
    );
  }
}

export default Details;
