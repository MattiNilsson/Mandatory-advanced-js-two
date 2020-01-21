import React from 'react';
import axios from "axios";

import {Helmet} from "react-helmet";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Edit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      movie : [],
      title : "title",
      description : "desciption",
      director : "director",
      rating : " rating",

      titleValue : "",
      descValue : "",
      dirValue : "",
      ratingValue : "",
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeHandeler = this.onChangeHandeler.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  onSubmit(e){
    e.preventDefault();
    console.log(
      this.state.titleValue,
      this.state.descValue,
      this.state.dirValue,
      this.state.ratingValue,
    );

    axios.put("http://3.120.96.16:3001/movies/" + this.props.match.params.id,
    {
      title : this.state.titleValue,
      description : this.state.descValue,
      director : this.state.dirValue,
      rating : this.state.ratingValue,
    })
    .then((response) =>{
      console.log(response);
      this.goBack();
    }).catch(() =>{
      alert("SOMETHING WENT TERRIBLE WRONG LMAO")
    })

    this.setState({
      titleValue : "",
      descValue : "",
      dirValue : "",
      ratingValue : "",
    })
  }

  goBack(){
    this.props.history.goBack();
  }

  onChangeHandeler(e){
    const value = e.target.value;
    this.setState({
      [e.target.name]: value,
    });
    console.log(e.target.name + " : " + value);
  }

  componentDidMount(){
    (axios.get("http://3.120.96.16:3001/movies/" + this.props.match.params.id)
      .then((response) =>{
        console.log(response);
        this.setState({
          movie : response.data,
        });
        this.setState({
          titleValue : this.state.movie.title,
          descValue : this.state.movie.description,
          dirValue : this.state.movie.director,
          ratingValue : this.state.movie.rating,
        })
      })
      .catch((error) =>{
        alert("SOMETHING WENT TERRIBLE WRONG LMAO")
      })
    )
  }

  render(){
    return (
      <div className="overall">
        <Helmet>
          <title>Matti - Edit</title>
        </Helmet>
        <h1>Edit Movie</h1>
        <form onSubmit={this.onSubmit}>
          Title
          <input 
            name="titleValue" 
            value={this.state.titleValue} 
            onChange={this.onChangeHandeler} 
            placeholder={this.state.movie.title}
          />
          Description
          <textarea
            name="descValue" 
            value={this.state.descValue} 
            onChange={this.onChangeHandeler} 
            placeholder={this.state.movie.description}
          />
          Director
          <input 
            name="dirValue" 
            value={this.state.dirValue} 
            onChange={this.onChangeHandeler} 
            placeholder={this.state.movie.director}
          />
          Rating
          <input 
            type="number"
            step="0.1"
            name="ratingValue" 
            value={this.state.ratingValue} 
            onChange={this.onChangeHandeler} 
            placeholder={this.state.movie.rating}
          />
          <button className="btn" type="submit">Change Movie</button>
        </form>
      </div>
    );
  }
}

export default Edit;
